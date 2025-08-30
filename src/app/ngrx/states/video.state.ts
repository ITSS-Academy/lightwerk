import {VideoModel} from '../../models/video.model';

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
}
