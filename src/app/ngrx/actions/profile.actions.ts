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
  "[UserVideo] Get user videos success", props<{ userVideos: VideoModel[], totalCount: number }>()
);

export const getUserVideosFailure = createAction(
  "[UserVideo] Get user videos failure", props<{ error: any }>()
);

export const SortUserVideos = createAction(
  '[UserVideo] Sort user videos',
  props<{ sortOrder: 'asc' | 'desc' }>()
);

export const clearUserVideos = createAction(
  '[UserVideo] Clear user videos'
);
