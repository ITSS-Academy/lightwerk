import {createAction, props} from '@ngrx/store';
import {VideoModel} from '../../models/video.model';

export const getFollowingVideoList = createAction(
  '[Following] Get Following Video List', props<{ userId: string }>());
export const getFollowingVideoListSuccess = createAction(
  '[Following] Get Following Video List Success', props<{ videos: VideoModel[] }>());
export const getFollowingVideoListFailure = createAction(
  '[Following] Get Following Video List Failure', props<{ error: any }>());

