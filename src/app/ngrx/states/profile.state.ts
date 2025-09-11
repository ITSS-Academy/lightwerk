import {VideoModel} from '../../models/video.model';
import {ProfileModel} from '../../models/profile.model';


export interface ProfileState {
  userVideos: VideoModel[];
  isLoading: boolean;
  error: any;

  profile: ProfileModel,
  isGettingProfile: boolean,
  isGetProfileSuccess: boolean,
  isGetProfileError: any,

  isEditing: boolean,
  isEditSuccess: boolean,
  isEditError: any,

  followingList: ProfileModel[],
  isLoadingFollowingList: boolean,
  errorLoadingFollowingList: any,
  isGetSuccessFollowingList: boolean,

  followersList: ProfileModel[],
  isLoadingFollowersList: boolean,
  errorLoadingFollowersList: any,
  isGetSuccessFollowersList: boolean,
  canLoadMore: boolean;
  totalCount: number;

  likedVideos: VideoModel[];
  isLoadingLikedVideos: boolean;
  errorLoadingLikedVideos: any;
  canLoadMoreLikedVideos: boolean;
  totalCountLikedVideos: number;
}


