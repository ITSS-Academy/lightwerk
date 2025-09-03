import {createAction, props} from '@ngrx/store';
import {VideoModel} from '../../models/video.model';

export const getUserVideos = createAction(
  "[UserVideo] Get user videos",
  props<{
    profileId: string,
    page: number,
    orderBy: 'asc' | 'desc',
  }>()
);

export const getUserVideosSuccess = createAction(
  "[UserVideo] Get user videos success", props<{ userVideos: VideoModel[] }>()
);

export const getUserVideosFailure = createAction(
  "[UserVideo] Get user videos failure", props<{ error: any }>()
)
