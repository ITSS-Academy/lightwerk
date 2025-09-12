import {createAction, props} from '@ngrx/store';
import {ProfileModel} from '../../models/profile.model';
import {VideoModel} from '../../models/video.model';

export const searchUsers = createAction('[Search] Search Users', props<{
  query: string,
}>());
export const searchUsersSuccess = createAction('[Search] Search Users Success', props<{
  users: ProfileModel | null,
  totalItems: number
}>());

export const searchUsersFailure = createAction('[Search] Search Users Failure', props<{
  error: any,
}>());


export const searchVideos = createAction('[Search] Search Videos', props<{
  query: string,
}>());
export const searchVideosSuccess = createAction('[Search] Search Videos Success', props<{
  videos: VideoModel[],
  totalItems: number
}>());
export const searchVideosFailure = createAction('[Search] Search Videos Failure', props<{
  error: any,
}>());


// Follow User
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

