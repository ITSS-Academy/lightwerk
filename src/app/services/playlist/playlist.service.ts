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

  async getAllPlaylistsAndCheckVideoInclusion(profileID: string, videoId: string) {
    const playlists = await this.getAllPlaylists(profileID).toPromise();
    if (!playlists) {
      throw new Error('Failed to fetch playlists');
    }
    console.log(playlists)
    const updatedPlaylists = await Promise.all(playlists.map(async (playlist) => {
      const {data, error} = await supabase
        .from('video_playlists')
        .select('*')
        .eq('playlistId', playlist.id)
        .eq('videoId', videoId)
        .maybeSingle();
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking video in playlist:', error);
        throw new Error('Failed to check video in playlist');
      }
      return {
        ...playlist,
        isHaveVideo: !!data
      };
    }));
    return updatedPlaylists;
  }

  async addVideoToPlaylist(videoId: string) {
    // Get current user profile ID
    const sessionRes = await supabase.auth.getSession();
    if (!sessionRes.data.session) throw new Error('No user session');
    const userId = sessionRes.data.session.user.id;

    // Fetch all playlists for the user
    try {
      let playlists;
      playlists = await this.getAllPlaylists(userId).toPromise();
      let xemSauPlaylist = playlists!.find(p => p.title === 'Xem sau');

      // If not found, create it
      if (!xemSauPlaylist) {
        const createRes: any = await this.createPlaylist('Xem sau', false).toPromise();
        xemSauPlaylist = createRes?.playlist || createRes?.data || createRes;
        // If API returns playlist in a different property, adjust above
        if (!xemSauPlaylist?.id) throw new Error('Failed to create "Xem sau" playlist');
      }

      // Add video to the playlist
      await this.addToPlaylist(xemSauPlaylist.id, videoId).toPromise();
      return true;
    } catch (e) {
      throw new Error('Failed to fetch playlists');
    }
  }

  async removeFromPlaylist(videoId: string) {
    const {error: deleteError} = await supabase
      .from('video_playlists')
      .delete()
      .eq('videoId', videoId);

    if (deleteError) {
      console.error('Error removing video from playlists:', deleteError);
      throw new Error('Failed to remove video from playlists');
    }

    return true;

  }

  async removeVideoFromPlaylist(playlistId: string, videoId: string) {
    const {error: deleteError} = await supabase
      .from('video_playlists')
      .delete()
      .eq('videoId', videoId)
      .eq('playlistId', playlistId);

    if (deleteError) {
      console.error('Error removing video from playlist:', deleteError);
      throw new Error('Failed to remove video from playlist');
    }

    return {
      playlistId,
      videoId
    }
  }

  async getIsSavedInPlaylist(videoId: string) {
    //get video is in any playlist of current user
    const sessionRes = await supabase.auth.getSession();
    if (!sessionRes.data.session) throw new Error('No user session');
    const userId = sessionRes.data.session.user.id;
    const {data: playlists, error: fetchError} = await supabase
      .from('playlist')
      .select('id')
      .eq('profileId', userId);
    if (fetchError) {
      console.error('Error fetching user playlists:', fetchError);
      throw new Error('Failed to fetch user playlists');
    }
    if (!playlists || playlists.length === 0) {
      return false;
    }
    const playlistIds = playlists.map(p => p.id);
    const {data, error: checkError} = await supabase
      .from('video_playlists')
      .select('playlistId')
      .in('playlistId', playlistIds)
      .eq('videoId', videoId)

    if (checkError) {
      console.error('Error checking video in playlists:', checkError);
      throw new Error('Failed to check video in playlists');
    }
    return data && data.length > 0;
  }
}
