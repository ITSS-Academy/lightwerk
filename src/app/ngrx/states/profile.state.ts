import {VideoModel} from '../../models/video.model';


export interface ProfileState {
  userVideos: VideoModel[];
  isLoading: boolean;
  error: any;
  canLoadMore: boolean;
  totalCount: number;
}
