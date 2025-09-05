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

export const getFollowingList = createAction(
  "[Profile] Get following list",
  props<{
    userId: string,
  }>()
);

export const getFollowingListSuccess = createAction(
  "[Profile] Get following list success", props<{ followingList: ProfileModel[] }>()
);

export const getFollowingListFailure = createAction(
  "[Profile] Get following list failure", props<{ error: any }>()
)
export const getFollowersList = createAction(
  "[Profile] Get followers list",
  props<{
    userId: string,
  }>()
);
export const getFollowersListSuccess = createAction(
  "[Profile] Get followers list success", props<{ followersList: ProfileModel[] }>()
);
export const getFollowersListFailure = createAction(
  "[Profile] Get followers list failure", props<{ error: any }>()
)
