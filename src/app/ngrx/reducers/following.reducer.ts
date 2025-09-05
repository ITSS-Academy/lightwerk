import * as FollowingActions from '../actions/following.actions';
import {createReducer, on} from '@ngrx/store';
import {FollowingState} from '../states/following.state';

export const initialFollowingState: FollowingState = {
  FollowingVideoList: [],
  isLoading: false,
  isLoadSuccess: false,
  error: null
};

export const followingReducer = createReducer(
  initialFollowingState,


  on(FollowingActions.getFollowingVideoList, (state, {type}) => ({
    ...state,
    isLoading: true,
    isLoadSuccess: false,
    error: null
  })),


  on(FollowingActions.getFollowingVideoListSuccess, (state, {type, videos}) => ({
    ...state,
    isLoading: false,
    isLoadSuccess: true,
    FollowingVideoList: videos,
    error: null
  })),


  on(FollowingActions.getFollowingVideoListFailure, (state, {type, error}) => ({
    ...state,
    isLoading: false,
    isLoadSuccess: false,
    error
  }))
);
