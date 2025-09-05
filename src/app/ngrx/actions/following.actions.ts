import {createAction, props} from '@ngrx/store';
import {VideoModel} from '../../models/video.model';

export const getVideosFollowedChannels = createAction(
  '[Following] Get Videos Followed Channels',
  props<{
    page: number;
  }>()
);
export const getVideosFollowedChannelsSuccess = createAction(
  '[Following] Get Videos Followed Channels Success',
  props<{
    videos: VideoModel[];
    totalItems: number;
  }>()
);
export const getVideosFollowedChannelsFailure = createAction(
  '[Following] Get Videos Followed Channels Failure',
  props<{
    error: any;
  }>()
);

export const clearFollowingState = createAction('[Following] Clear Following State');
