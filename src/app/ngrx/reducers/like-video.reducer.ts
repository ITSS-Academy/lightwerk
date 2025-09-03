import {createReducer, on} from '@ngrx/store';
import {LikeVideoState} from '../states/like-video.state';
import * as LikeVideoActions from '../actions/like-video.actions';

const initialState: LikeVideoState = {
  count: 0,
  isLoading: false,
  isLoadSuccess: false,
  isLoadError: null
}

export const likeVideoReducer = createReducer(
  initialState,
  on(LikeVideoActions.getAllLikeVideos, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      isLoadSuccess: false,
      isLoadError: null
    }
  }),
  on(LikeVideoActions.getAllLikeVideosSuccess, (state, {type, count}) => {
    console.log(type);
    return {
      ...state,
      count: count,
      isLoading: false,
      isLoadSuccess: true,
      isLoadError: null
    }
  }),
  on(LikeVideoActions.getAllLikeVideosFailure, (state, {type, error}) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      isLoadSuccess: false,
      isLoadError: error
    }
  })
)

