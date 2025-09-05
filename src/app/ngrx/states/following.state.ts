import {VideoModel} from '../../models/video.model';

export interface FollowingState {
  FollowingVideoList: VideoModel[];
  isLoading: boolean;
  isLoadSuccess: boolean;
  error: any;
}
