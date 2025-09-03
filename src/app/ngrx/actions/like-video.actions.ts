import {createAction, props} from '@ngrx/store';

export const getAllLikeVideos = createAction('[LikeVideo] Get All Like Videos', props<{
  videoId: string
}>());
export const getAllLikeVideosSuccess = createAction('[LikeVideo] Get All Like Videos Success', props<{
  count: number
}>());
export const getAllLikeVideosFailure = createAction('[LikeVideo] Get All Like Videos Failure', props<{
  error: any
}>());

export const deleteLikeVideo = createAction('[LikeVideo] Delete Like Video', props<{
  id: number
}>());
export const deleteLikeVideoSuccess = createAction('[LikeVideo] Delete Like Video Success', props<{
  count: number
}>());
export const deleteLikeVideoFailure = createAction('[LikeVideo] Delete Like Video Failure', props<{
  error: any
}>());
