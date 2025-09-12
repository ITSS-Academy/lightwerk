import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, mergeMap, Observable, of, throwError} from 'rxjs';
import supabase from '../../utils/supabase';
import {VideoModel} from '../../models/video.model';
import {environment} from '../../environments/environment.development';
import {ProfileModel} from '../../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getAccessToken() {
    return from(supabase.auth.getSession())
  }

  getUserVideo(uid: string, page: number, orderBy: 'asc' | 'desc') {
    return from(supabase.auth.getSession()).pipe(
      mergeMap((data) => {
        if (data.error || !data.data.session) {
          return throwError(() => new Error('No access token'));
        }
        console.log(data.data.session);
        return this.http.get<{
          videos: VideoModel[];
          totalCount: number;
        }>(`${environment.api_base_url}/video/user-videos/${uid}?page=${page}&orderBy=${orderBy}&limit=10`, {
          headers: {
            Authorization: `${data.data.session.access_token}`
          }
        });
      })
    )
  }

  async editProfileUser(username: string, bio: string, avatar: File | null): Promise<ProfileModel> {
    let avatarPath = null;

    const {data, error} = await supabase.auth.getUser();
    if (error || !data.user) {
      console.log(error);
      throw new Error('No access token');
    }
    const uid = data.user.id;

    if (avatar) {
      const fileExt = avatar.name.split('.').pop();
      const filePath = `avatars/${uid}/avatar.${fileExt}`;

      const {data, error: uploadError} = await supabase.storage
        .from('avatars')
        .upload(filePath, avatar, {upsert: true});

      if (uploadError) {
        console.log(uploadError);
        throw new Error(uploadError.message);
      }

      avatarPath = data?.path;
    }

    const updates: any = {
      username,
      bio,
      email: data.user.email,
    };

    if (avatarPath) {
      updates.avatarPath = avatarPath;
    }

    const {error: updateError} = await supabase
      .from('profile')
      .update(updates)
      .eq('id', data.user.id);

    if (updateError) {
      console.log(updateError);
      throw new Error(updateError.message);
    }

    return {
      ...updates,
      id: data.user.id,
    } as ProfileModel;
  }


  async getProfile(userId: string) {
    const {data, error} = await supabase
      .from('profile')
      .select(`
    *,
    following: profile_follows!FK_f5a23cae4f853a80601d52b4cd4(followerId),
    followers:profile_follows!FK_01be95fab8cc9e6da1fb9dfe36a(followingId)
  `)
      .eq('id', userId)
      .single();


    if (error) {
      console.log(error);
      return throwError(() => new Error(error.message));
    }
    return {
      ...data,
      followersCount: data.followers ? data.followers.length : 0,
      followingCount: data.following ? data.following.length : 0,
    } as ProfileModel;

  }

  async getLikedVideos(userId: string, page: number, orderBy: 'asc' | 'desc', startDate?: string, endDate?: string) {
    const {data, error} = await supabase
      .from('like_video')
      .select(`
        *,
        video:videoId (
          id,
          title,
          thumbnailPath,
          createdAt,
          aspectRatio,
          status,
          isPublic,
          viewCount,
          profile: profileId (
            id,
            username,
            avatarPath
          )
        )
      `)
      .eq('profileId', userId)
      .eq('video.status', 'success')
      .eq('video.isPublic', true)
      .order('createdAt', {ascending: orderBy === 'asc'})
      .range(page * 10, page * 10 + 9);

    // Apply date filtering if both startDate and endDate are provided
    let filteredData = data;
    // if (startDate && endDate && data) {
    //   filteredData = data?.filter(item => {
    //     const videoDate = new Date(item.video.createdAt!);
    //     return videoDate >= new Date(startDate) && videoDate <= new Date(endDate);
    //   });
    // }


    if (error) {
      console.log(error);
      return Promise.reject(new Error(error.message));
    }

    //select count of liked videos
    const {count, error: countError} = await supabase
      .from('like_video')
      .select(`
        *,
        video:videoId (
          id,
          title,
          thumbnailPath,
          createdAt,
          aspectRatio,
          status,
          isPublic,
          viewCount,
          profile: profileId (
            id,
            username,
            avatarPath
          )
        )
      `, {count: 'exact'})
      .eq('profileId', userId)
      .eq('video.status', 'success')
      .eq('video.isPublic', true);

    if (countError) {
      console.log(countError);
      return Promise.reject(new Error(countError.message));
    }

    return {
      videos: filteredData ? filteredData.map(item => item.video) : [],
      totalCount: count || 0
    }

  }

  //get Follower
  getFollowers(userId: string) {
    return from(supabase.from('profile_follows')
      .select(`
        *,
        follower: followerId (
          id,
          username,
          avatarPath
        )
      `)
      .eq('followingId', userId)).pipe(
      mergeMap(({data, error}) => {
        if (error) {
          console.log(error);
          return throwError(() => new Error(error.message));
        }
        if (!data) {
          return of([]);
        }
        const followers = data.map(item => ({
          ...item.follower,
          isFollowing: false // This will be updated later
        } as ProfileModel));

        return this.getAccessToken().pipe(
          mergeMap(({data, error}) => {
            if (error || !data.session) {
              return of(followers);
            }
            const currentUserId = data.session.user.id;
            return from(supabase.from('profile_follows')
              .select('followingId')
              .eq('followerId', currentUserId)).pipe(
              mergeMap(({data: followingData, error: followingError}) => {
                if (followingError) {
                  console.log(followingError);
                  return of(followers);
                }
                const followingIds = followingData ? followingData.map(item => item.followingId) : [];
                const updatedFollowers = followers.map(follower => ({
                  ...follower,
                  isFollowing: followingIds.includes(follower.id)
                }));
                return of(updatedFollowers);
              })
            );
          })
        );
      })
    );
  }

  //get Following
  getFollowing(userId: string) {
    return from(supabase.from('profile_follows')
      .select(`
        *,
        following: followingId (
          id,
          username,
          avatarPath
        )
      `)
      .eq('followerId', userId)).pipe(
      mergeMap(({data, error}) => {
        if (error) {
          console.log(error);
          return throwError(() => new Error(error.message));
        }
        if (!data) {
          return of([]);
        }
        const following = data.map(item => ({
          ...item.following,
          isFollowing: false // This will be updated later
        } as ProfileModel));

        return this.getAccessToken().pipe(
          mergeMap(({data, error}) => {
            if (error || !data.session) {
              return of(following);
            }
            const currentUserId = data.session.user.id;
            return from(supabase.from('profile_follows')
              .select('followingId')

              .eq('followerId', currentUserId)).pipe(
              mergeMap(({data: followingData, error: followingError}) => {
                if (followingError) {
                  console.log(followingError);
                  return of(following);
                }
                const followingIds = followingData ? followingData.map(item => item.followingId) : [];
                const updatedFollowing = following.map(follow => ({
                  ...follow,
                  isFollowing: followingIds.includes(follow.id)
                }));
                return of(updatedFollowing);
              })
            );
          })
        );
      })
    );
  }
  
  toggleFollowUser(userId: string, shouldFollow: boolean): Observable<{ isFollowing: boolean }> {
    return from(
      (async () => {
        const {data, error} = await supabase.auth.getSession();
        if (error) throw new Error(error.message);

        const currentUserId = data.session?.user.id;
        if (!currentUserId) throw new Error('User not authenticated');

        if (shouldFollow) {
          // Follow: current user là followerId, target user là followingId
          const {error: followError} = await supabase
            .from('profile_follows')
            .insert({
              followerId: currentUserId,
              followingId: userId
            });

          if (followError) throw new Error(followError.message);
        } else {
          // Unfollow
          const {error: unfollowError} = await supabase
            .from('profile_follows')
            .delete()
            .match({followerId: currentUserId, followingId: userId});

          if (unfollowError) throw new Error(unfollowError.message);
        }

        return {isFollowing: shouldFollow};
      })()
    );
  }

}
