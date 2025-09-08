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


  async deleteLikeVideo(videoId: string,) {
    const {
      data: userData, error: userError
    } = await supabase.auth.getUser()
    if (userError) {
      throw new Error('No profile id');
    }

    const profileId = userData.user?.id;
    if (!profileId) {
      throw new Error('No profile id');
    }

    const {data, error} = await supabase
      .from('like_video')
      .delete()
      .eq('videoId', videoId)
      .eq('profileId', profileId)
      .select('*');
    if (error) {
      throw new Error('Failed to delete like video');
    }
    return data;
  }

  async addLikeVideo(videoId: string,) {
    const {
      data: userData, error: userError
    } = await supabase.auth.getUser()
    if (userError) {
      throw new Error('No profile id');
    }

    const profileId = userData.user?.id;
    if (!profileId) {
      throw new Error('No profile id');
    }

    console.log(videoId)

    const {data, error} = await supabase
      .from('like_video')
      .insert([{videoId: videoId, profileId: profileId}])
      .select('*');
    if (error) {
      throw new Error('Failed to add like video');
    }
    return data;

  }

  async getLikeCountAndIsLike(videoId: string) {
    const {
      data: userData, error: userError
    } = await supabase.auth.getUser()
    if (userError) {
      throw new Error('No profile id');
    }

    const profileId = userData.user?.id;
    if (!profileId) {
      throw new Error('No profile id');
    }

    const {data, error} = await supabase
      .from('like_video')
      .select('*', {count: 'exact'})
      .eq('videoId', videoId)
      .eq('profileId', profileId);
    if (error) {
      throw new Error('Failed to get like count');
    }
    return {likeCount: data?.length || 0, isLike: data?.length > 0};

  }
}





