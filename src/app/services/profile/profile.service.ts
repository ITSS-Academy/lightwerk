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

  editProfileUser(username: string, bio: string, avatar: File | null) {
    return from(new Promise<{
      username: string;
      bio: string;
      avatarUrl: string;
      id: string;
    }>((resolve) => {
      console.log(avatar);
      console.log(username, bio);

      resolve({
        username,
        bio,
        avatarUrl: avatar ? URL.createObjectURL(avatar) : '',
        id: 'asd'
      });
    }));
  }

  getFollowers(userId: string) {
    return from(supabase.auth.getSession()).pipe(
      mergeMap((data) => {
        if (data.error || !data.data.session) {
          return throwError(() => new Error('No access token'));
        }
        console.log(data.data.session);
        return of([{
          id: '11111',
          username: 'HahahahahahaHahahahahahaHahahahahahaHahahahahahaHahahahahahaHahahahahahaHahahahahaha',
          avatarPath: 'https://thichtrangtri.com/wp-content/uploads/2025/05/hinh-anh-con-meo-cute-1.jpg',
          isFollowing: false
        },
          {
            id: '22222',
            username: 'OMG Too',
            avatarPath: 'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg',
            isFollowing: true
          },
          {
            id: '33333',
            username: 'OMG3',
            avatarPath: 'https://i.pinimg.com/564x/c8/cc/68/c8cc6816a2448d0a03a5e46e932ce7a9.jpg',
            isFollowing: false
          },
          {
            id: '12345',
            username: 'OMG4',
            avatarPath: 'https://nupet.vn/wp-content/uploads/2023/11/anh-meo-hai-huoc-nupet-21.jpg',
            isFollowing: true
          },
          {
            id: '678910',
            username: 'OMG5',
            avatarPath: 'https://cdn.mobilecity.vn/mobilecity-vn/images/2024/11/top-meme-meo-cuc-dang-yeu-8.png.webp',
            isFollowing: false
          },
          {
            id: 'hheheh',
            username: 'OMG6',
            avatarPath: 'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-gian-cute-1.jpg',
            isFollowing: true
          },
          {
            id: '22222',
            username: 'OMG Too',
            avatarPath: 'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg',
            isFollowing: true
          },
          {
            id: '33333',
            username: 'OMG3',
            avatarPath: 'https://i.pinimg.com/564x/c8/cc/68/c8cc6816a2448d0a03a5e46e932ce7a9.jpg',
            isFollowing: false
          },
          {
            id: '12345',
            username: 'OMG4',
            avatarPath: 'https://nupet.vn/wp-content/uploads/2023/11/anh-meo-hai-huoc-nupet-21.jpg',
            isFollowing: true
          },
          {
            id: '678910',
            username: 'OMG5',
            avatarPath: 'https://cdn.mobilecity.vn/mobilecity-vn/images/2024/11/top-meme-meo-cuc-dang-yeu-8.png.webp',
            isFollowing: false
          },
          {
            id: 'hheheh',
            username: 'OMG6',
            avatarPath: 'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-gian-cute-1.jpg',
            isFollowing: true
          },
        ]);
      })
    )
  }

  getFollowing(userId: string): Observable<ProfileModel[]> {
    return from(supabase.auth.getSession()).pipe(
      mergeMap((data) => {
        if (data.error || !data.data.session) {
          return throwError(() => new Error('No access token'));
        }
        console.log(data.data.session);
        return of([{
          id: '1',
          username: 'follower1',
          avatarPath: 'https://sieupet.com/sites/default/files/pictures/images/1-1473150685951-5.jpg',
          isFollowing: false
        },
          {
            id: '2',
            username: 'follower2',
            avatarPath: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/05/anh-cho-hai-74.jpg',
            isFollowing: true
          },
          {
            id: '3',
            username: 'follower3',
            avatarPath: 'https://cdn2.fptshop.com.vn/unsafe/800x0/meme_cho_1_e568e5b1a5.jpg',
            isFollowing: false
          },
          {
            id: '4',
            username: 'follower4',
            avatarPath: 'https://top10tphcm.com/wp-content/uploads/2024/01/hinh-anh-cho-husky-cute-dep-hai-huoc-70.jpg',
            isFollowing: true
          },
          {
            id: '5',
            username: 'follower5',
            avatarPath: 'https://kimipet.vn/wp-content/uploads/2021/06/husky-ngao-.jpg',
            isFollowing: false
          },
          {
            id: '6',
            username: 'follower6',
            avatarPath: 'https://hoichimtroi.com/wp-content/uploads/2025/07/anh-cho-cute-de-thuong.jpg',
            isFollowing: true
          }
        ]);
      })
    )
  }

  async getProfile(userId: string) {
    const {data, error} = await supabase
      .from('profile')
      .select(`
    *,
    following:profile_follows!FK_01be95fab8cc9e6da1fb9dfe36a(followingId),
    followers: profile_follows!FK_f5a23cae4f853a80601d52b4cd4(followerId)
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

}



