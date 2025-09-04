import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, mergeMap, throwError} from 'rxjs';
import supabase from '../../utils/supabase';
import {VideoModel} from '../../models/video.model';
import {environment} from '../../environments/environment.development';

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
        }>(`${environment.api_base_url}/video/user-videos/${uid}?page=${page}&orderBy=${orderBy}&limit=12`, {
          headers: {
            Authorization: `${data.data.session.access_token}`
          }
        });
      })
    )
  }
}
