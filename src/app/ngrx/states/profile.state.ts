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

  followingList: ProfileModel[];
  isLoadingFollowingList: boolean;
  errorLoadingFollowingList: any;

  followersList: ProfileModel[];
  isLoadingFollowersList: boolean;
  errorLoadingFollowersList: any;
  totalCount: number;
  canLoadMore: boolean;

  likedVideos: VideoModel[];
  isLoadingLikedVideos: boolean;
  errorLoadingLikedVideos: any;
  canLoadMoreLikedVideos: boolean;
  totalCountLikedVideos: number;

  isFollowing: boolean,
  isFollowSuccess: boolean,
  isFollowError: any,
}


