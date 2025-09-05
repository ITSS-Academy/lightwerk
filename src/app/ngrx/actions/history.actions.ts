import {createAction, props} from '@ngrx/store';

export const getAllHistory = createAction('[History] Get All History');
export const getAllHistorySuccess = createAction('[History] Get All History Success', props<
  { history: any[] }>());
export const getAllHistoryFailure = createAction('[History] Get All History Failure', props<{
  error: any
}>());

export const deleteHistoryVideo = createAction('[History] Delete History Video', props<{ videoId: string }>());
export const deleteHistoryVideoSuccess = createAction('[History] Delete History Video Success', props<{ videoId: string }>());
export const deleteHistoryVideoFailure = createAction('[History] Delete History Video Failure', props<{ error: any }>());
