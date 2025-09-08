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
export const deleteLikeVideo = createAction('[LikeVideo] Clear Like Video State', props<{
  videoId: string
}>());
export const deleteLikeVideoSuccess = createAction('[LikeVideo] Clear Like Video State Success');
export const deleteLikeVideoFailure = createAction('[LikeVideo] Clear Like Video State Failure', props<{
  error: any
}>());
export const createLikeVideo = createAction('[LikeVideo] Create Like Video State', props<{
  videoId: string
}>());
export const createLikeVideoSuccess = createAction('[LikeVideo] Create Like Video State Success',);
export const createLikeVideoFailure = createAction('[LikeVideo] Create Like Video State Failure', props<{
  error: any
}>());
