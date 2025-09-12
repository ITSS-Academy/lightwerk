import {ProfileState} from '../states/profile.state';
import {VideoModel} from '../../models/video.model';
import {createReducer, on} from '@ngrx/store';
import * as ProfileActions from '../actions/profile.actions';
import {ProfileModel} from '../../models/profile.model';


export const initialState: ProfileState = {
  userVideos: <VideoModel[]>[],
  isLoading: false,
  error: null,

  isEditing: false,
  isEditSuccess: false,
  isEditError: null,
  profile: <ProfileModel>{},

  isGettingProfile: false,
  isGetProfileSuccess: false,
  isGetProfileError: null,

  followingList: <ProfileModel[]>[],
  isLoadingFollowingList: false,
  errorLoadingFollowingList: null,


  followersList: <ProfileModel[]>[],
  isLoadingFollowersList: false,
  errorLoadingFollowersList: null,

  canLoadMore: true,
  totalCount: 0,

  likedVideos: <VideoModel[]>[],
  isLoadingLikedVideos: false,
  errorLoadingLikedVideos: null,
  canLoadMoreLikedVideos: true,
  totalCountLikedVideos: 0,

  isFollowing: false,
  isFollowSuccess: false,
  isFollowError: null,
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
      profile: {
        ...state.profile,
        ...profile
      },
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
    return {
      ...state,
      isEditing: false,
      isEditSuccess: false,
      isEditError: null,
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
  on(ProfileActions.getProfile, (state, {userId, type}) => {
    console.log(type);
    return {
      ...state,
      isGettingProfile: true,
      isGetProfileSuccess: false,
      isGetProfileError: null,
    }
  }),
  on(ProfileActions.getProfileSuccess, (state, {profile, type}) => {
    console.log(type);
    return {
      ...state,
      profile: profile,
      isGettingProfile: false,
      isGetProfileSuccess: true,
    }
  }),
  on(ProfileActions.getProfileFailure, (state, {error, type}) => {
    console.log(type);
    return {
      ...state,
      isGettingProfile: false,
      isGetProfileSuccess: false,
      isGetProfileError: error,
    }
  }),
  on(ProfileActions.getLikedVideos, (state, {type}) => {
      console.log(type);
      return {
        ...state,
        isLoadingLikedVideos: true,
        errorLoadingLikedVideos: null,
      }
    }
  ),
  on(ProfileActions.getLikedVideosSuccess, (state, {likedVideos, totalCount, type}) => {
    console.log(type);
    const newLikedVideos = [...state.likedVideos, ...likedVideos];
    return <ProfileState>{
      ...state,
      likedVideos: newLikedVideos,
      isLoadingLikedVideos: false,
      errorLoadingLikedVideos: null,
      canLoadMoreLikedVideos: newLikedVideos.length < totalCount,
      totalCountLikedVideos: totalCount,
    }
  }),
  on(ProfileActions.getLikedVideosFailure, (state, {error, type}) => {
    console.log(type);
    return <ProfileState>{
      ...state,
      isLoadingLikedVideos: false,
      errorLoadingLikedVideos: error,
    }
  }),

  // Following List Actions
  on(ProfileActions.getFollowing, (state, {type}) => {
      console.log(type);
      return {
        ...state,
        isLoadingFollowingList: true,
        errorLoadingFollowingList: null,
      }
    }
  ),
  on(ProfileActions.getFollowingSuccess, (state, {following, totalCount, type}) => {
    console.log(type);
    const newFollowingList = [...state.followingList, ...following];
    return <ProfileState>{
      ...state,
      followingList: newFollowingList,
      isLoadingFollowingList: false,
      errorLoadingFollowingList: null,
      canLoadMore: newFollowingList.length < totalCount,
      totalCount: totalCount,
    }
  }),
  on(ProfileActions.getFollowingFailure, (state, {error, type}) => {
    console.log(type);
    return <ProfileState>{
      ...state,
      isLoadingFollowingList: false,
      errorLoadingFollowingList: error,
    }
  }),

  // Followers List Actions
  on(ProfileActions.getFollowers, (state, {type}) => {
      console.log(type);
      return {
        ...state,
        isLoadingFollowersList: true,
        errorLoadingFollowersList: null,
      }
    }
  ),
  on(ProfileActions.getFollowersSuccess, (state, {followers, totalCount, type}) => {
    console.log(type);
    const newFollowersList = [...state.followersList, ...followers];

    return <ProfileState>{
      ...state,
      followersList: newFollowersList,
      isLoadingFollowersList: false,
      errorLoadingFollowersList: null,
      canLoadMore: newFollowersList.length < totalCount,
      totalCount: totalCount,
    }
  }),
  on(ProfileActions.getFollowersFailure, (state, {error, type}) => {
    console.log(type);
    return <ProfileState>{
      ...state,
      isLoadingFollowersList: false,
      errorLoadingFollowersList: error,
    }
  }),

  on(ProfileActions.followUser, (state, {userId}) => {
    console.log('Following user with ID:', userId);
    return {
      ...state,
      isFollowing: false,
      isFollowSuccess: false,
      isFollowError: null,
    }
  }),

  on(ProfileActions.followUserSuccess, (state, {isFollowing}) => {
    console.log('Follow user success. Now following:', isFollowing);
    return {
      ...state,
      profile: state.profile && {
        ...state.profile,
        isFollowing: isFollowing,
        followersCount: state.profile.followersCount
          ? state.profile.followersCount + (isFollowing ? 1 : -1)
          : isFollowing ? 1 : 0,
      },
      isFollowing: true,
      isFollowSuccess: true,
      isFollowError: null,
    }
  }),

  on(ProfileActions.followUserFailure, (state, {error}) => {
    console.error('Follow user failure:', error);
    return {
      ...state,
      isFollowing: false,
      isFollowSuccess: false,
      isFollowError: error,
    }
  }),
)
