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
          avatarUrl: 'https://thichtrangtri.com/wp-content/uploads/2025/05/hinh-anh-con-meo-cute-1.jpg',
          isFollowing: false
        },
          {
            id: '22222',
            username: 'OMG Too',
            avatarUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg',
            isFollowing: true
          },
          {
            id: '33333',
            username: 'OMG3',
            avatarUrl: 'https://i.pinimg.com/564x/c8/cc/68/c8cc6816a2448d0a03a5e46e932ce7a9.jpg',
            isFollowing: false
          },
          {
            id: '12345',
            username: 'OMG4',
            avatarUrl: 'https://nupet.vn/wp-content/uploads/2023/11/anh-meo-hai-huoc-nupet-21.jpg',
            isFollowing: true
          },
          {
            id: '678910',
            username: 'OMG5',
            avatarUrl: 'https://cdn.mobilecity.vn/mobilecity-vn/images/2024/11/top-meme-meo-cuc-dang-yeu-8.png.webp',
            isFollowing: false
          },
          {
            id: 'hheheh',
            username: 'OMG6',
            avatarUrl: 'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-gian-cute-1.jpg',
            isFollowing: true
          },
          {
            id: '22222',
            username: 'OMG Too',
            avatarUrl: 'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg',
            isFollowing: true
          },
          {
            id: '33333',
            username: 'OMG3',
            avatarUrl: 'https://i.pinimg.com/564x/c8/cc/68/c8cc6816a2448d0a03a5e46e932ce7a9.jpg',
            isFollowing: false
          },
          {
            id: '12345',
            username: 'OMG4',
            avatarUrl: 'https://nupet.vn/wp-content/uploads/2023/11/anh-meo-hai-huoc-nupet-21.jpg',
            isFollowing: true
          },
          {
            id: '678910',
            username: 'OMG5',
            avatarUrl: 'https://cdn.mobilecity.vn/mobilecity-vn/images/2024/11/top-meme-meo-cuc-dang-yeu-8.png.webp',
            isFollowing: false
          },
          {
            id: 'hheheh',
            username: 'OMG6',
            avatarUrl: 'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-gian-cute-1.jpg',
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
          avatarUrl: 'https://sieupet.com/sites/default/files/pictures/images/1-1473150685951-5.jpg',
          isFollowing: false
        },
          {
            id: '2',
            username: 'follower2',
            avatarUrl: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/05/anh-cho-hai-74.jpg',
            isFollowing: true
          },
          {
            id: '3',
            username: 'follower3',
            avatarUrl: 'https://cdn2.fptshop.com.vn/unsafe/800x0/meme_cho_1_e568e5b1a5.jpg',
            isFollowing: false
          },
          {
            id: '4',
            username: 'follower4',
            avatarUrl: 'https://top10tphcm.com/wp-content/uploads/2024/01/hinh-anh-cho-husky-cute-dep-hai-huoc-70.jpg',
            isFollowing: true
          },
          {
            id: '5',
            username: 'follower5',
            avatarUrl: 'https://kimipet.vn/wp-content/uploads/2021/06/husky-ngao-.jpg',
            isFollowing: false
          },
          {
            id: '6',
            username: 'follower6',
            avatarUrl: 'https://hoichimtroi.com/wp-content/uploads/2025/07/anh-cho-cute-de-thuong.jpg',
            isFollowing: true
          }
        ]);
      })
    )
  }

}



