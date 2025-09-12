import {createReducer, on} from '@ngrx/store';
import * as SearchActions from '../actions/search.actions';
import {ProfileModel} from '../../models/profile.model';
import {VideoModel} from '../../models/video.model';
import {SearchState} from '../states/search.state';

const initialState: SearchState = {
  isSearchingUser: null,
  isSearchUserSuccess: false,
  isSearchUserError: null,
  isSearchingVideos: [],
  isSearchVideosSuccess: false,
  isSearchVideosError: null,
  isLoadingUser: false,
  isLoadingVideos: false,
  isFollowing: false,
  isFollowSuccess: false,
  isFollowError: null,
}


export const searchReducer = createReducer(
  initialState,

  on(SearchActions.searchUsers, (state, {query}) => {
    console.log('Searching users with query:', query);
    return {
      ...state,
      isSearchingUser: <ProfileModel>{},
      isLoadingUser: true,
      isSearchUserSuccess: false,
      isSearchUserError: null,
    }
  }),

  on(SearchActions.searchUsersSuccess, (state, {users, totalItems}) => {
    console.log('Search users success:', users, 'Total items:', totalItems);
    return {
      ...state,
      isSearchingUser: users,
      isLoadingUser: false,
      isSearchUserSuccess: true,
      isSearchUserError: null,
    }
  }),

  on(SearchActions.searchUsersFailure, (state, {error}) => {
    console.error('Search users failure:', error);
    return {
      ...state,
      isSearchingUser: <ProfileModel>{},
      isLoadingUser: false,
      isSearchUserSuccess: false,
      isSearchUserError: error,
    }
  }),

  on(SearchActions.searchVideos, (state, {query}) => {
    console.log('Searching videos with query:', query);
    return {
      ...state,
      isSearchingVideos: <VideoModel[]>[],
      isLoadingVideos: true,
      isSearchVideosSuccess: false,
      isSearchVideosError: null,
    }
  }),

  on(SearchActions.searchVideosSuccess, (state, {videos, totalItems}) => {
    console.log('Search videos success:', videos, 'Total items:', totalItems);
    return {
      ...state,
      isSearchingVideos: videos,
      isLoadingVideos: false,
      isSearchVideosSuccess: true,
      isSearchVideosError: null,
    }
  }),

  on(SearchActions.searchVideosFailure, (state, {error}) => {
    console.error('Search videos failure:', error);
    return {
      ...state,
      isSearchingVideos: <VideoModel[]>[],
      isSearchVideosSuccess: false,
      isLoadingVideos: false,
      isSearchVideosError: error,
    }
  }),

  // Follow User
  on(SearchActions.followUser, (state, {userId}) => {
    console.log('Following user with ID:', userId);
    return {
      ...state,
      isFollowing: false,
      isFollowSuccess: false,
      isFollowError: null,
    }
  }),

  on(SearchActions.followUserSuccess, (state, {isFollowing}) => {
    console.log('Follow user success. Now following:', isFollowing);
    return {
      ...state,
      isSearchingUser: state.isSearchingUser && {
        ...state.isSearchingUser,
        isFollowing: isFollowing,
        followersCount: state.isSearchingUser.followersCount
          ? state.isSearchingUser.followersCount + (isFollowing ? 1 : -1)
          : isFollowing ? 1 : 0,
      },
      isFollowing: true,
      isFollowSuccess: true,
      isFollowError: null,
    }
  }),

  on(SearchActions.followUserFailure, (state, {error}) => {
    console.error('Follow user failure:', error);
    return {
      ...state,
      isFollowing: false,
      isFollowSuccess: false,
      isFollowError: error,
    }
  }),
);

