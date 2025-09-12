import {VideoModel} from '../../models/video.model';
import {ProfileModel} from '../../models/profile.model';

export interface VideoState {
  videoDetail: VideoModel,
  isCreating: boolean,
  isCreateError: any,
  isCreateSuccess: boolean,

  isGetting: boolean,
  isGetSuccess: boolean,
  isGetError: any,

  isCreatingInfo: boolean,
  isCreateInfoError: any,
  isCreateInfoSuccess: boolean,

  latestVideos: VideoModel[],
  isGettingFirstLatest: boolean,
  canGetMoreLatest: boolean,
  isGettingLatest: boolean,
  isGetLatestSuccess: boolean,
  isGetLatestError: any,

  isGettingVideoDetail: boolean,
  isGettingVideoDetailSuccess: boolean,
  isGettingVideoDetailError: any,

  isCategoryById: boolean,
  isCategoryByIdSuccess: boolean,
  isCategoryByIdError: any,

  isGettingLikeComment: boolean
  isGettingLikeCommentSuccess: boolean
  isGettingLikeCommentError: any,

  isGettingLiked: boolean
  isGettingLikedSuccess: boolean
  isGettingLikedError: any,

  isGettingCommented: boolean
  isGettingCommentedSuccess: boolean
  isGettingCommentedError: any,

  isFollowing: boolean,
  isFollowSuccess: boolean,
  isFollowError: any,
}
