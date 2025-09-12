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
);
