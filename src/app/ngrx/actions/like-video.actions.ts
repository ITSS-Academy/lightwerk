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
export const clearLikeVideoState = createAction('[LikeVideo] Clear Like Video State', props<{
  profileId: string
  videoId: string
}>());
export const clearLikeVideoStateSuccess = createAction('[LikeVideo] Clear Like Video State Success', props<{
  countAfterDelete: number
}>());
export const clearLikeVideoStateFailure = createAction('[LikeVideo] Clear Like Video State Failure', props<{
  error: any
}>());
export const createLikeVideoState = createAction('[LikeVideo] Create Like Video State', props<{
  profileId: string
  videoId: string
}>());
export const createLikeVideoStateSuccess = createAction('[LikeVideo] Create Like Video State Success', props<{
  countAfterCreate: number
}>());
export const createLikeVideoStateFailure = createAction('[LikeVideo] Create Like Video State Failure', props<{
  error: any
}>());
