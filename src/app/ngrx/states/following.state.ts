import {VideoModel} from '../../models/video.model';

export interface FollowingState {
  videos: VideoModel[];
  canLoadMore: boolean;
  isGettingFirst: boolean;
  isGettingVideosFollowedChannels: boolean;
  error: any;
}
