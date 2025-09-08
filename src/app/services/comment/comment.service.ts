import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, mergeMap} from 'rxjs';
import supabase from '../../utils/supabase';
import {environment} from '../../environments/environment';
import {CommentModel} from '../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {


  }

  getAccessToken() {
    return from(supabase.auth.getSession())
  }

  createComment(content: string, videoId: string) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        let headers = {};
        if (!data.error && data.data.session) {
          headers = {
            Authorization: `${data.data.session.access_token}`
          }
        }
        return this.http.post<CommentModel[]>(`${environment.api_base_url}/comment-video/create`, {
          videoId: videoId,
          content: content
        }, {
          headers: headers
        });
      })
    )
  }

  //get all comments for a video
  getAllComments(videoId: string) {
    return this.http.get<CommentModel[]>(`${environment.api_base_url}/comment-video/get-comments-video/${videoId}`);
  }

}
