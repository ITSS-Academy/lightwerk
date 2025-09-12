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
  canGetMoreLatest: true,
  isGettingFirstLatest: false,
  isGettingLatest: false,
  isGetLatestSuccess: false,
  isGetLatestError: null,

  isGettingVideoDetail: false,
  isGettingVideoDetailSuccess: false,
  isGettingVideoDetailError: null,

  isCategoryById: false,
  isCategoryByIdSuccess: false,
  isCategoryByIdError: null,

  isGettingLikeComment: false,
  isGettingLikeCommentSuccess: false,
  isGettingLikeCommentError: null,

  isGettingCommented: false,
  isGettingCommentedSuccess: false,
  isGettingCommentedError: null,

  isGettingLiked: false,
  isGettingLikedSuccess: false,
  isGettingLikedError: null,
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
      isGettingFirstLatest: state.latestVideos.length === 0,
      isGettingLatest: true,
      isGetLatestError: null,
      isGetLatestSuccess: false,
    }
  }),
  on(VideoActions.getLatestVideosSuccess, (state, {type, videos, totalItems}) => {
    console.log(type, videos.length, state.latestVideos.length);
    return {
      ...state,
      canGetMoreLatest: state.latestVideos.length + videos.length < totalItems,
      latestVideos: [...state.latestVideos, ...videos],
      isGettingFirstLatest: false,
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
    console.log(video);
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

  on(VideoActions.getVideosByCategory, (state, {categoryId, page}) => {
    return {
      ...state,
      isGettingLatest: true,
      isGetLatestError: null,
      isGetLatestSuccess: false,
    }
  }),

  on(VideoActions.getVideosByCategorySuccess, (state, {videos, totalItems}) => {
    return {
      ...state,
      canGetMoreLatest: state.latestVideos.length + videos.length < totalItems,
      latestVideos: [...state.latestVideos, ...videos],
      isGettingFirstLatest: false,
      isGettingLatest: false,
      isGetLatestError: null,
      isGetLatestSuccess: true,
    }
  }),

  on(VideoActions.getVideosByCategoryFailure, (state, {error}) => {
    return {
      ...state,
      isGettingLatest: false,
      isGetLatestError: error,
      isGetLatestSuccess: false,
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

  on(VideoActions.getLikedVideos, (state, {videoId}) => {
    return {
      ...state,
      isGettingLikeComment: true,
      isGettingLikeCommentSuccess: false,
      isGettingLikeCommentError: null,
    }
  }),
  on(VideoActions.getLikedVideosSuccess, (state, {likesCount, isLiked, isSave, commentsCount}) => {
    return {
      ...state,
      videoDetail: <VideoModel>{
        ...state.videoDetail,
        likeCount: likesCount,
        isLikedByCurrentUser: isLiked,
        isSavedByCurrentUser: isSave,
        commentCount: commentsCount,
      },
      isGettingLikeComment: false,
      isGettingLikeCommentSuccess: true,
      isGettingLikeCommentError: null,
    }
  }),
  on(VideoActions.getLikedVideosFailure, (state, {error}) => {
    return {
      ...state,
      isGettingLikeComment: false,
      isGettingLikeCommentSuccess: false,
      isGettingLikeCommentError: error,
    }
  }),
  on(VideoActions.getLikeCount, (state, {videoId, type}) => {
    console.log(type);
    return {
      ...state,
      isGettingLiked: true,
      isGettingLikedSuccess: false,
      isGettingLikedError: null,
    }
  }),
  on(VideoActions.getLikeCountSuccess, (state, {likesCount, isLiked, type}) => {
    console.log(type);
    return {
      ...state,
      videoDetail: <VideoModel>{
        ...state.videoDetail,
        likeCount: likesCount,
        isLikedByCurrentUser: isLiked,
      },
      isGettingLiked: false,
      isGettingLikedSuccess: true,
      isGettingLikedError: null,
    }
  }),
  on(VideoActions.getLikeCountFailure, (state, {error, type}) => {
    console.log(type);
    return {
      ...state,
      isGettingLiked: false,
      isGettingLikedSuccess: false,
      isGettingLikedError: error,
    }
  }),
  on(VideoActions.setIsSaved, (state) => {
    return {
      ...state,
      videoDetail: <VideoModel>{
        ...state.videoDetail,
        isSavedByCurrentUser: !state.videoDetail.isSavedByCurrentUser
      }
    }
  })
);


