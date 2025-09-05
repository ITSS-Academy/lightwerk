import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, mergeMap} from 'rxjs';
import supabase from '../../utils/supabase';
import {environment} from '../../environments/environment';
import {PlaylistModel} from '../../models/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) {
  }

  getAccessToken() {
    return from(supabase.auth.getSession())
  }


  //create playlist

  createPlaylist(title: string, isPublic: boolean, thumbnail?: File) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        let headers = {};
        if (!data.error && data.data.session) {
          headers = {
            Authorization: `${data.data.session.access_token}`
          }
        }
        const formData = new FormData();
        if (thumbnail) {
          formData.append('thumbnail', thumbnail);
        }
        formData.append('title', title);
        formData.append('isPublic', String(isPublic));
        return this.http.post<any>(`${environment.api_base_url}/playlist/create`, formData, {
          headers: headers
        });
      })
    )
  }


  //delete playlist
  deletePlaylist(playlistId: string) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        let headers = {};
        if (!data.error && data.data.session) {
          headers = {
            Authorization: `${data.data.session.access_token}`
          }
        }
        return this.http.delete<{ message: string }>(`${environment.api_base_url}/playlist/delete/${playlistId}`, {
          headers: headers
        });
      })
    )
  }

  //get all playlists

  getAllPlaylists(profileID: string) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        let headers = {};
        if (!data.error && data.data.session) {
          headers = {
            Authorization: `${data.data.session.access_token}`
          }
        }
        let url = `${environment.api_base_url}/playlist/all-playlists/${profileID}`;

        return this.http.get<any[]>(url, {
          headers: headers
        });
      })
    )
  }

  //get playlist details
  getPlaylistDetails(playlistId: string) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        let headers = {};
        if (!data.error && data.data.session) {
          headers = {
            Authorization: `${data.data.session.access_token}`
          }
        }
        let url = `${environment.api_base_url}/playlist/all-videos/${playlistId}`;

        return this.http.get<PlaylistModel>(url, {
          headers: headers
        });
      })
    )
  }

//add video to playlist

  addToPlaylist(playlistId: string, videoId: string) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        let headers = {};
        if (!data.error && data.data.session) {
          headers = {
            Authorization: `${data.data.session.access_token}`
          }
        }
        return this.http.post<any>(`${environment.api_base_url}/playlist/add-video`, {
          playlistId,
          videoId
        }, {
          headers: headers
        });
      })
    )
  }
}
