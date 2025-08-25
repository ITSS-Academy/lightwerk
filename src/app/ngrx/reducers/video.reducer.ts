import {VideoState} from '../states/video.state';
import {VideoModel} from '../../models/video.model';
import {createReducer, on} from '@ngrx/store';
import * as VideoActions from '../actions/video.actions';

const initialState: VideoState = {
  videoDetail: {} as VideoModel,
  isCreating: false,
  isCreateError: null,
  isCreateSuccess: false
}

export const videoReducer = createReducer(
  initialState,
  on(VideoActions.uploadVideo, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isCreating: true,
      isCreateError: null,
      isCreateSuccess: false,
    }
  }),
  on(VideoActions.uploadVideoSuccess, (state, {video}) => {
    return {
      ...state,
      videoDetail: video,
      isCreating: false,
      isCreateError: false,
      isCreateSuccess: true,
    }
  }),
  on(VideoActions.uploadVideoFailure, (state, {error}) => {
    return {
      ...state,
      isCreating: false,
      isCreateError: error,
      isCreateSuccess: false,
    }
  }),
  on(VideoActions.clearVideoState, (state) => {
    return initialState
  })
);
