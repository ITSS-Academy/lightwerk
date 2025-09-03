import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, mergeMap, throwError} from 'rxjs';
import supabase from '../../utils/supabase';
import {VideoModel} from '../../models/video.model';
import {environment} from '../../environments/environment.development';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/states/auth.state';
import {LikeVideoState} from '../../ngrx/states/like-video.state';


@Injectable({
  providedIn: 'root'
})
export class LikeVideoService {


  constructor(private http: HttpClient) {


  }

  getAccessToken() {
    return from(supabase.auth.getSession())
  }


  getLikeCount(videoId: string) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        let headers = {};
        if (!data.error && data.data.session) {
          headers = {
            Authorization: `${data.data.session.access_token}`
          }
        }
        return this.http.get<{
          count: number
        }>(`${environment.api_base_url}/like-video/get-likes-video/${videoId}`, headers
        );
      })
    )
  }

  deleteLikeVideo(videoId: string) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        let headers = {};
        if (!data.error && data.data.session) {
          headers = {
            Authorization: `${data.data.session.access_token}`
          }
        }
        return this.http.delete<{
          count: number
        }>(`${environment.api_base_url}/like-video/delete-like-video/${videoId}`, {
          headers: headers
        });
      })
    )
  }
}
