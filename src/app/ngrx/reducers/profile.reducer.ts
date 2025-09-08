import {ProfileState} from '../states/profile.state';
import {VideoModel} from '../../models/video.model';
import {createReducer, on} from '@ngrx/store';
import * as ProfileActions from '../actions/profile.actions';
import {ProfileModel} from '../../models/profile.model';
import {clearProfileState} from '../actions/profile.actions';

export const initialState: ProfileState = {
  userVideos: <VideoModel[]>[],
  isLoading: false,
  error: null,

  isEditing: false,
  isEditSuccess: false,
  isEditError: null,
  profile: <ProfileModel>{},

  followingList: [],
  isLoadingFollowingList: false,
  errorLoadingFollowingList: undefined,
  isGetSuccessFollowingList: false,

  followersList: [],
  isLoadingFollowersList: false,
  errorLoadingFollowersList: undefined,
  isGetSuccessFollowersList: false,
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
  on(ProfileActions.editProfileUser, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isEditing: true,
      isEditSuccess: false,
      isEditError: null,
    }
  }),
  on(ProfileActions.editProfileUserSuccess, (state, {profile, type}) => {
    console.log(type);
    return <ProfileState>{
      ...state,
      profile: profile,
      isEditing: false,
      isEditSuccess: true,
      isEditError: null,
    }
  }),
  on(ProfileActions.editProfileUserFailure, (state, {error, type}) => {
    console.log(type);
    return <ProfileState>{
      ...state,
      isEditing: false,
      isEditSuccess: false,
      isEditError: error,
    }
  }),
  on(ProfileActions.resetEditProfileState, (state, {type}) => {
    console.log(type);
    return initialState
  }),
  on(ProfileActions.getFollowingList, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isLoadingFollowingList: true,
      errorLoadingFollowingList: null,
      isGetSuccessFollowingList: false,
    }
  }),
  on(ProfileActions.getFollowingListSuccess, (state, {followingList, type}) => {
    console.log(type);
    return {
      ...state,
      followingList: followingList,
      isLoadingFollowingList: false,
      errorLoadingFollowingList: null,
      isGetSuccessFollowingList: true,
    }
  }),
  on(ProfileActions.getFollowingListFailure, (state, {error, type}) => {
    console.log(type);
    return {
      ...state,
      isLoadingFollowingList: false,
      errorLoadingFollowingList: error,
      isGetSuccessFollowingList: false,
    }
  }),
  on(ProfileActions.getFollowersList, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isLoadingFollowersList: true,
      errorLoadingFollowersList: null,
      isGetSuccessFollowersList: false,
    }
  }),
  on(ProfileActions.getFollowersListSuccess, (state, {followersList, type}) => {
    console.log(type);
    return {
      ...state,
      followersList: followersList,
      isLoadingFollowersList: false,
      errorLoadingFollowersList: null,
      isGetSuccessFollowersList: true,
    }
  }),
  on(ProfileActions.getFollowersListFailure, (state, {error, type}) => {
    console.log(type);
    return {
      ...state,
      isLoadingFollowersList: false,
      errorLoadingFollowersList: error,
      isGetSuccessFollowersList: false,
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
  on(ProfileActions.clearProfileState, () => initialState),
)
