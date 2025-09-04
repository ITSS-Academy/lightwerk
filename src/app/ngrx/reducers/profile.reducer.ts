import {ProfileState} from '../states/profile.state';
import {VideoModel} from '../../models/video.model';
import {createReducer, on} from '@ngrx/store';
import * as ProfileActions from '../actions/profile.actions';

export const initialState: ProfileState = {
  userVideos: <VideoModel[]>[],
  isLoading: false,
  error: null,
  currentPage: 0,
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

  on(ProfileActions.getUserVideosSuccess, (state, {userVideos, totalCount, currentPage, type}) => {
    console.log(type);
    // Filter out duplicates by id
    const existingIds = new Set(state.userVideos.map(v => v.id));
    const newUniqueVideos = userVideos.filter(v => !existingIds.has(v.id));
    return <ProfileState>{
      ...state,
      userVideos: currentPage > 0 ? [...state.userVideos, ...newUniqueVideos] : userVideos,
      isLoading: false,
      error: null,
      currentPage,
      totalCount,
    }
  }),
  on(ProfileActions.getUserVideosFailure, (state, {error, type}) => {
    console.log(type);
    return <ProfileState>{
      ...state,
      isLoading: false,
      error: error,
    }
  })
)
