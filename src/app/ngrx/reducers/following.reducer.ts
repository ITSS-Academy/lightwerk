import {createReducer, on} from '@ngrx/store';
import * as FollowingActions from '../actions/following.actions';
import {FollowingState} from '../states/following.state';

const initialState: FollowingState = {
  videos: [],
  canLoadMore: true,
  isGettingFirst: false,
  isGettingVideosFollowedChannels: false,
  error: null
}

export const followingReducer = createReducer(
  initialState,
  on(FollowingActions.getVideosFollowedChannels, (state, action) => {
    console.log('action', action)
    return {
      ...state,
      isGettingVideosFollowedChannels: true,
      error: null,
      isGettingFirst: state.videos.length === 0
    }
  }),
  on(FollowingActions.getVideosFollowedChannelsSuccess, (state, action) => {
    console.log('action', action)
    console.log('state', state)
    console.log(state.videos.length + action.videos.length < action.totalItems)
    return {
      ...state,
      isGettingVideosFollowedChannels: false,
      isGettingFirst: false,
      canLoadMore: state.videos.length + action.videos.length < action.totalItems,
      videos: [...state.videos, ...action.videos],
      error: null
    }
  }),
  on(FollowingActions.getVideosFollowedChannelsFailure, (state, action) => {
    return {
      ...state,
      isGettingVideosFollowedChannels: false,
      isGettingFirst: false,
      error: action.error
    }
  }),
  on(FollowingActions.clearFollowingState, (state) => {
    return initialState;
  })
)
