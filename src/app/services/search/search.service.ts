import {Injectable} from '@angular/core';
import supabase from '../../utils/supabase';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, from} from 'rxjs';
import {ProfileModel} from '../../models/profile.model';
import {VideoModel} from '../../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  searchUser(query: string): Observable<ProfileModel | null> {
    return from(
      (async () => {
        const {data, error} = await supabase
          .from('profile')
          .select('*,profile_follows!followingId(*)')
          .or(`username.ilike.%${query}%`)
          .limit(1);

        if (error) throw new Error(error.message);

        const {data: dataSession, error: errorSession} = await supabase.auth.getSession();
        if (errorSession) throw new Error(errorSession.message);
        console.log('========================', data)

        const currentUserId = dataSession.session?.user.id;
        let result = data && data.length ? {...data[0]} : null;
        if (result && currentUserId) {
          result.isFollowing = result.profile_follows.some((follow: any) => follow.followerId === currentUserId);
        }
        result = {
          ...result,
          followersCount: result ? result.profile_follows.length : 0
        }
        return result;
      })()
    );
  }

  searchVideos(query: string): Observable<{ videos: VideoModel[], totalItems: number }> {
    return from(
      (async () => {
        const {data, error} = await supabase.auth.getSession();
        if (error) throw new Error(error.message);
        const accessToken = data.session?.access_token;
        const headers: any = accessToken ? {'Authorization': `${accessToken}`} : {};
        const response = await this.http.get<any>(`${environment.api_base_url}/video/search?query=${encodeURIComponent(query)}`, {headers}).toPromise();
        return {
          videos: response.videos || [],
          totalItems: response.pagination.totalCount || 0
        };
      })()
    );
  }

  //toggle follow user
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

