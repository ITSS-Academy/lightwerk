import {VideoState} from '../states/video.state';
import {VideoModel} from '../../models/video.model';
import {createReducer, on} from '@ngrx/store';
import * as VideoActions from '../actions/video.actions';
import {state} from '@angular/animations';

const initialState: VideoState = {
  videoDetail: {} as VideoModel,
  isCreating: false,
  isCreateError: null,
  isCreateSuccess: false,

  isGetError: null,
  isGetting: false,
  isGetSuccess: false,

  isCreatingInfo: false,
  isCreateInfoError: null,
  isCreateInfoSuccess: false,

  latestVideos: [],
  isGettingLatest: false,
  isGetLatestSuccess: false,
  isGetLatestError: null,

  isGettingVideoDetail: false,
  isGettingVideoDetailSuccess: false,
  isGettingVideoDetailError: null,

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
  }),
  on(VideoActions.getVideoInfo, (state, {videoId, type}) => {
    console.log(type);
    return {
      ...state,
      isGetting: true,
      isGetError: null,
      isGetSuccess: false,
    }
  }),
  on(VideoActions.getVideoInfoSuccess, (state, {video}) => {
    return {
      ...state,
      videoDetail: video,
      isGetting: false,
      isGetError: null,
      isGetSuccess: true,
    }
  }),
  on(VideoActions.getVideoInfoFailure, (state, {error}) => {
    return {
      ...state,
      isGetting: false,
      isGetError: error,
      isGetSuccess: false,
    }
  }),
  on(VideoActions.createVideoInfo, (state, {video, type}) => {
    console.log(type);
    return {
      ...state,
      isCreatingInfo: true,
      isCreateInfoError: null,
      isCreateInfoSuccess: false,
    }
  }), on(VideoActions.createVideoInfoSuccess, (state, {video}) => {
    return {
      ...state,
      videoDetail: video,
      isCreatingInfo: false,
      isCreateInfoError: null,
      isCreateInfoSuccess: true,
    }
  }),
  on(VideoActions.createVideoInfoFailure, (state, {error}) => {
    return {
      ...state,
      isCreatingInfo: false,
      isCreateInfoError: error,
      isCreateInfoSuccess: false,
    }
  }),

  on(VideoActions.getLatestVideos, (state, {page, type}) => {
    console.log(type);
    return {
      ...state,
      isGettingLatest: true,
      isGetLatestError: null,
      isGetLatestSuccess: false,
    }
  }),
  on(VideoActions.getLatestVideosSuccess, (state, {videos}) => {
    return {
      ...state,
      latestVideos: videos,
      isGettingLatest: false,
      isGetLatestError: null,
      isGetLatestSuccess: true,
    }
  }),
  on(VideoActions.getLatestVideosFailure, (state, {error}) => {
    return {
      ...state,
      isGettingLatest: false,
      isGetLatestError: error,
      isGetLatestSuccess: false,
    }
  }),
  on(VideoActions.getVideoDetail, (state, {videoId}) => {
    return {
      ...state,
      isGettingVideoDetail: true,
      isGettingVideoDetailSuccess: false,
      isGettingVideoDetailError: null,
    }
  }),
  on(VideoActions.getVideoDetailSuccess, (state, {video}) => {
    return {
      ...state,
      videoDetail: video,
      isGettingVideoDetail: false,
      isGettingVideoDetailSuccess: true,
      isGettingVideoDetailError: null,
    }
  }),
  on(VideoActions.getVideoDetailFailure, (state, {error}) => {
    return {
      ...state,
      isGettingVideoDetail: false,
      isGettingVideoDetailSuccess: false,
      isGettingVideoDetailError: error,
    }
  }),
  on(VideoActions.clearVideoDetail, (state) => {
    return {
      ...state,
      videoDetail: {} as VideoModel,
      isGettingVideoDetail: false,
      isGettingVideoDetailSuccess: false,
      isGettingVideoDetailError: null,
    }
  }),
);


