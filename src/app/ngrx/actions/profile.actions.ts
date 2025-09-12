import {createAction, props} from '@ngrx/store';
import {VideoModel} from '../../models/video.model';
import {ProfileModel} from '../../models/profile.model';

export const getUserVideos = createAction(
  "[UserVideo] Get user videos",
  props<{
    profileId: string,
    page: number,
    orderBy: 'asc' | 'desc',
  }>()
);

export const getUserVideosSuccess = createAction(
  "[UserVideo] Get user videos success", props<{ userVideos: VideoModel[], totalCount: number }>()
);

export const getUserVideosFailure = createAction(
  "[UserVideo] Get user videos failure", props<{ error: any }>()
);

export const SortUserVideos = createAction(
  '[UserVideo] Sort user videos',
  props<{ sortOrder: 'asc' | 'desc' }>()
);

export const clearUserVideos = createAction(
  '[UserVideo] Clear user videos'
);

export const editProfileUser = createAction(
  "[Profile] Update profile",
  props<{
    username: string,
    bio: string,
    avatarUrl: File | null,
  }>()
);
export const editProfileUserSuccess = createAction(
  "[Profile] Update profile success", props<{ profile: ProfileModel }>()
);

export const editProfileUserFailure = createAction(
  "[Profile] Update profile failure", props<{ error: any }>()
);

export const resetEditProfileState = createAction(
  "[Profile] Reset edit profile state"
);


export const clearProfileState = createAction(
  '[Profile] Clear profile state'
);

export const getProfile = createAction(
  "[Profile] Get profile",
  props<{
    userId: string,
  }>()
);

export const getProfileSuccess = createAction(
  "[Profile] Get profile success", props<{ profile: ProfileModel }>()
);

export const getProfileFailure = createAction(
  "[Profile] Get profile failure", props<{ error: any }>()
);

export const getLikedVideos = createAction(
  "[LikedVideos] Get liked videos",
  props<{
    profileId: string,
    page: number,
    orderBy: 'asc' | 'desc',
  }>()
);

export const getLikedVideosSuccess = createAction(
  "[LikedVideos] Get liked videos success", props<{ likedVideos: VideoModel[], totalCount: number }>()
);

export const getLikedVideosFailure = createAction(
  "[LikedVideos] Get liked videos failure", props<{ error: any }>()
);


export const getFollowers = createAction(
  "[Followers] Get followers",
  props<{
    profileId: string,
    page: number,
    orderBy: 'asc' | 'desc',
  }>()
);

export const getFollowersSuccess = createAction(
  "[Followers] Get followers success", props<{ followers: ProfileModel[], totalCount: number }>()
);

export const getFollowersFailure = createAction(
  "[Followers] Get followers failure", props<{ error: any }>()
);


export const getFollowing = createAction(
  "[Following] Get following",
  props<{
    profileId: string,
    page: number,
    orderBy: 'asc' | 'desc',
  }>()
);

export const getFollowingSuccess = createAction(
  "[Following] Get following success", props<{ following: ProfileModel[], totalCount: number }>()
);

export const getFollowingFailure = createAction(
  "[Following] Get following failure", props<{ error: any }>()
);

export const followUser = createAction('[Search] Follow User', props<{
  userId: string,
  shouldFollow: boolean,
}>());
export const followUserSuccess = createAction('[Search] Follow User Success', props<{
  isFollowing: boolean,
}>());
export const followUserFailure = createAction('[Search] Follow User Failure', props<{
  error: any,
}>());
