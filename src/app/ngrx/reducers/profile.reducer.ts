import {ProfileState} from '../states/profile.state';
import {VideoModel} from '../../models/video.model';
import {createReducer, on} from '@ngrx/store';
import * as ProfileActions from '../actions/profile.actions';

export const initialState: ProfileState = {
  userVideos: <VideoModel[]>[],
  isLoading: false,
  error: null,
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

  on(ProfileActions.getUserVideosSuccess, (state, {userVideos, type}) => {
    console.log(type);
    return <ProfileState>{
      ...state,
      userVideos: userVideos,
      isLoading: false,
      error: null,
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
