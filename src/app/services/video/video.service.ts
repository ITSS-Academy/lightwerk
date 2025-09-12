import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/states/auth.state';
import {catchError, from, map, mergeMap, Observable, throwError, toArray} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {environment} from '../../environments/environment.development';
import {UploadVideoModel, VideoModel} from '../../models/video.model';
import supabase from '../../utils/supabase';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) {
  }

  getAccessToken() {
    return from(supabase.auth.getSession())
  }

  chunkVideo(video: File, videoId: string): Observable<any> {
    const chunkSize = 1024 * 1024; // 1MB
    const totalChunks = Math.ceil(video.size / chunkSize);

    const chunks = Array.from({length: totalChunks}, (_, i) => {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, video.size);
      const chunk = video.slice(start, end);
      return {index: i, chunk};
    });

    let uploadedChunks = 0;

    return this.getAccessToken().pipe(
      mergeMap((data) => {
        return from(chunks).pipe(
          mergeMap(({index, chunk}) => {
            if (data.error || !data.data.session) {
              return throwError(() => new Error('No access token'));
            }
            const formData = new FormData();

            const fileType = video.type.split('/')[1] || 'bin';

            formData.set('videoName', `${videoId}.${fileType}.part${index}`);
            formData.set('videoId', videoId);
            formData.append('files', chunk, `${videoId}.${fileType}.part${index}`);

            return this.http.post(`${environment.api_base_url}/video/upload`, formData, {
              headers: {
                Authorization: `${data.data.session.access_token}`
              }
            }).pipe(
              map((res) => {
                uploadedChunks++;
                return res;
              }),
              catchError(err => {
                console.error(`❌ Chunk ${index} failed`, err);
                return throwError(() => new Error(`Chunk ${index} failed: ${err.message}`));
              })
            );
          }, totalChunks),
          toArray(),
        );
      })
    )
  }

  mergeChunks(videoId: string) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        if (data.error || !data.data.session) {
          return throwError(() => new Error('No access token'));
        }
        return this.http.post<VideoModel>(`${environment.api_base_url}/video/merge?videoId=${videoId}`, {}, {
          headers: {
            Authorization: `${data.data.session.access_token}`
          }
        });
      })
    )
  }


  getVideoInfo(videoId: string): Observable<VideoModel> {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        if (data.error || !data.data.session) {
          return throwError(() => new Error('No access token'));
        }
        return this.http.get<VideoModel>(`${environment.api_base_url}/video/info/${videoId}`, {
          headers: {
            Authorization: `${data.data.session.access_token}`
          }
        });
      })
    )
  }

  createInfo(data: UploadVideoModel): Observable<VideoModel> {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('categoryId', data.categoryId);
    formData.append('isPublic', String(data.isPublic));
    if (data.thumbnail) {
      formData.append('thumbnail', data.thumbnail, data.thumbnail.name);
    }

    return from(this.getAccessToken()).pipe(
      mergeMap((authData) => {
        if (authData.error || !authData.data.session) {
          return throwError(() => new Error('No access token'));
        }
        return this.http.post<VideoModel>(`${environment.api_base_url}/video/create-info`, formData, {
          headers: {
            Authorization: `${authData.data.session.access_token}`
          }
        });
      })
    )
  }

  getLatestVideos(page: number,) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        const headers = new Headers();

        if (!data.error && data.data.session) {
          headers.append('Authorization', `${data.data.session.access_token}`);
        }

        return this.http.get<{
          videos: VideoModel[]
          pagination: {
            limit: number,
            page: number,
            totalCount: number
          }
        }>(`${environment.api_base_url}/video/latest?page=${page}&limit=10`, {
          headers: headers as any
        });
      })
    )
  }

  getVideoDetail(videoId: string): Observable<VideoModel> {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        if (data.error || !data.data.session) {
          return throwError(() => new Error('No access token'));
        }
        return this.http.get<VideoModel>(`${environment.api_base_url}/video/get-video/${videoId}`, {
          headers: {
            Authorization: `${data.data.session.access_token}`
          }
        });
      })
    )
  }

  getVideosByFollowedProfiles(page: number) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        if (data.error || !data.data.session) {
          return throwError(() => new Error('No access token'));
        }
        return this.http.get<{
          videos: VideoModel[]
          pagination: {
            limit: number,
            page: number,
            totalCount: number
          }
        }>(`${environment.api_base_url}/video/following-videos?page=${page}&limit=10`, {
          headers: {
            Authorization: `${data.data.session.access_token}`
          }
        });
      })
    )
  }

  async getVideosByCategory(categoryId: string, page: number) {
    const {data, error, count} = await supabase
      .from('video')
      .select(`
        *,
        like_video(count)
      `, {count: 'exact'})
      .eq('categoryId', categoryId)
      .eq('isPublic', true)
      .order('createdAt', {ascending: false})
      .range((page) * 10, (page + 1) * 10 - 1);

    if (error) {
      console.error('Error fetching videos by category:', error);
      throw new Error('Failed to fetch videos by category');
    }

    return {
      videos: data ? data.map(
        (video) => ({
            ...video,
            likeCount: video.like_video[0].count,
          }
        )) as VideoModel[] : [],
      pagination: {
        limit: 10,
        page,
        totalCount: count || 0
      }
    }
  }

  async getLikeCommentCount(videoId: string) {
    let headers = {};
    const {data, error} = await supabase.auth.getSession();
    if (!error && data.session) {
      headers = {
        Authorization: `${data.session.access_token}`
      }
    }

    const res = await this.http.get<{
      likesCount: number,
      isLiked: boolean,
      isSave: boolean,
      commentsCount: number
    }>(`${environment.api_base_url}/video/likes-comments-playlists/${videoId}`, {
      headers: headers
    }).toPromise();
    return res
  }

  // src/app/services/video/video.service.ts
  toggleFollowUser(userId: string, shouldFollow: boolean): Observable<{ isFollowing: boolean }> {
    return from(
      (async () => {
        const {data, error} = await supabase.auth.getSession();
        if (error) throw new Error(error.message);

        const currentUserId = data.session?.user.id;
        if (!currentUserId) throw new Error('User not authenticated');

        if (shouldFollow) {
          // Check if already following
          const {data: existing, error: checkError} = await supabase
            .from('profile_follows')
            .select('id')
            .eq('followerId', currentUserId)
            .eq('followingId', userId)
            .single();

          // Only insert if not already following (no data and error is 406)
          if (!existing && checkError && checkError.code === 'PGRST116') {
            const {error: followError} = await supabase
              .from('profile_follows')
              .insert({
                followerId: currentUserId,
                followingId: userId
              });
            if (followError) throw new Error(followError.message);
          }
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
