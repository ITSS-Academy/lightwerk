import {createAction, props} from '@ngrx/store';
import {VideoModel} from '../../models/video.model';

export const uploadVideo = createAction('[Video] Upload Video', props<{
  file: File,
}>());
export const uploadVideoSuccess = createAction('[Video] Upload Video Success', props<{
  video: VideoModel,
}>());
export const uploadVideoFailure = createAction('[Video] Upload Video Failure', props<{
  error: any,
}>());
export const clearVideoState = createAction('[Video] Clear Video State');
