import {VideoModel} from '../../models/video.model';

export interface VideoState {
  videoDetail: VideoModel,
  isCreating: boolean,
  isCreateError: any,
  isCreateSuccess: boolean,
}
