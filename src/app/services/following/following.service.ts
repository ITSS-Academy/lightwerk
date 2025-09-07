import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import supabase from '../../utils/supabase';
import {from, mergeMap, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {VideoModel} from '../../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {

  constructor(
    private http: HttpClient
  ) {

  }

  getAccessToken() {
    return from(supabase.auth.getSession())
  }

  getAllVideosFollowing(): Observable<{ videos: VideoModel[] }> {
    return this.getAccessToken().pipe(
      mergeMap((data: any) => {
        let headers = new HttpHeaders();
        if (!data.error && data.data.session) {
          headers = headers.set('Authorization', `Bearer ${data.data.session.access_token}`);
        }

        return this.http.get<{ videos: VideoModel[] }>(
          `${environment.api_base_url}/following-videos`,
          {headers}
        );
      })
    );
  }
}
