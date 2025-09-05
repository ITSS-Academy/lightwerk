import {ProfileState} from '../states/profile.state';
import {VideoModel} from '../../models/video.model';
import {createReducer, on} from '@ngrx/store';
import * as ProfileActions from '../actions/profile.actions';

export const initialState: ProfileState = {
  userVideos: <VideoModel[]>[],
  isLoading: false,
  error: null,
  canLoadMore: true,
  totalCount: 0,
}


export const profileReducer = createReducer(
  initialState,

  on(ProfileActions.getUserVideos, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    }
  }),

  on(ProfileActions.getUserVideosSuccess, (state, {userVideos, totalCount, type}) => {
    console.log(type);
    // Filter out duplicates by id

    return <ProfileState>{
      ...state,
      userVideos: [...state.userVideos, ...userVideos],
      isLoading: false,
      error: null,
      canLoadMore: state.userVideos.length < totalCount,
      totalCount: totalCount,
    }
  }),
  on(ProfileActions.getUserVideosFailure, (state, {error, type}) => {
    console.log(type);
    return <ProfileState>{
      ...state,
      isLoading: false,
      error: error,
    }
  }),
  on(ProfileActions.SortUserVideos, (state, {sortOrder}) => {
    const sortedVideos = [...state.userVideos].sort((a, b) => {
      // Reverse mapping: 'desc' = ascending, 'asc' = descending
      if (sortOrder === 'asc') {
        return (a.createdAt > b.createdAt) ? 1 : -1;
      } else {
        return (a.createdAt < b.createdAt) ? 1 : -1;
      }
    });
    return {
      ...state,
      userVideos: sortedVideos
    };
  }),
  on(ProfileActions.clearUserVideos, (state) => ({
    ...state,
    userVideos: [],
    totalCount: 0,
    canLoadMore: true,
    error: null,
    isLoading: false,
  })),
)
