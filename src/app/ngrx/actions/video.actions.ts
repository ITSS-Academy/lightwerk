import {createAction, props} from '@ngrx/store';
import {UploadVideoModel, VideoModel} from '../../models/video.model';

export const uploadVideo = createAction('[Video] Upload Video', props<{
  file: File,
  videoId: string
}>());
export const uploadVideoSuccess = createAction('[Video] Upload Video Success', props<{
  video: VideoModel,
}>());
export const uploadVideoFailure = createAction('[Video] Upload Video Failure', props<{
  error: any,
}>());
export const clearVideoState = createAction('[Video] Clear Video State');

export const getVideoInfo = createAction('[Video] Get Video Info', props<{
  videoId: string
}>());
export const getVideoInfoSuccess = createAction('[Video] Get Video Info Success', props<
  { video: VideoModel }>());
export const getVideoInfoFailure = createAction('[Video] Get Video Info Failure', props<{
  error: any,
}>());

export const createVideoInfo = createAction('[Video] Create Video Info', props<{
  video: UploadVideoModel
}>());
export const createVideoInfoSuccess = createAction('[Video] Create Video Info Success', props<
  { video: VideoModel }>());
export const createVideoInfoFailure = createAction('[Video] Create Video Info Failure', props<{
  error: any,
}>());

//get latest videos
export const getLatestVideos = createAction('[Video] Get Latest Videos', props<{
  page: number,
}>());
export const getLatestVideosSuccess = createAction('[Video] Get Latest Videos Success', props<
  { videos: VideoModel[], totalItems: number }>());
export const getLatestVideosFailure = createAction('[Video] Get Latest Videos Failure', props<{
  error: any,
}>());

export const getVideoDetail = createAction('[Video] Get Video Detail', props<{
  videoId: string
}>())
export const getVideoDetailSuccess = createAction('[Video] Get Video Detail Success', props<{
  video: VideoModel
}>())
export const getVideoDetailFailure = createAction('[Video] Get Video Detail Failure', props<
  { error: any }
>())

export const getVideosByCategory = createAction('[Video] Get Videos By Category', props<{
  categoryId: string,
  page: number,
}>())

export const getVideosByCategorySuccess = createAction('[Video] Get Videos By Category Success', props<{
  videos: VideoModel[],
  totalItems: number
}>())

export const getVideosByCategoryFailure = createAction('[Video] Get Videos By Category Failure', props<{
  error: any,
}>())
export const clearVideoDetail = createAction('[Video] Clear Video Detail')

export const getLikedVideos = createAction('[Video] Get Liked Videos', props<{
  videoId: string
}>())
export const getLikedVideosSuccess = createAction('[Video] Get Liked Videos Success', props<{
  likesCount: number,
  isLiked: boolean
  isSave: boolean
  commentsCount: number
}>())

export const getLikedVideosFailure = createAction('[Video] Get Liked Videos Failure', props<{
  error: any
}>())

export const getLikeCount = createAction('[Video] Get Like Count', props<{
  videoId: string
}>())
export const getLikeCountSuccess = createAction('[Video] Get Like Count Success', props<{
  likesCount: number,
  isLiked: boolean
}>())
export const getLikeCountFailure = createAction('[Video] Get Like Count Failure', props<{
  error: any
}>())

export const setIsSaved = createAction('[Video] Set Is Saved')

// export const followUser = createAction('[Search] Follow User', props<{
//   userId: string,
//   shouldFollow: boolean,
// }>());
// export const followUserSuccess = createAction('[Search] Follow User Success', props<{
//   isFollowing: boolean,
// }>());
// export const followUserFailure = createAction('[Search] Follow User Failure', props<{
//   error: any,
// }>());
//

export const getCommentCountAfterAdd = createAction('[Video] Get Comment Count After Add', props<{
  videoId: string
}>())
export const getCommentCountAfterAddSuccess = createAction('[Video] Get Comment Count After Add Success', props<{
  commentsCount: number
}>())
export const getCommentCountAfterAddFailure = createAction('[Video] Get Comment Count After Add Failure', props<{
  error: any
}>())
