import {ProfileModel} from '../../models/profile.model';
import {VideoModel} from '../../models/video.model';

export interface SearchState {
  isSearchingUser: ProfileModel | null,
  isLoadingUser: boolean,
  isSearchUserSuccess: boolean,
  isSearchUserError: any,

  isSearchingVideos: VideoModel[],
  isLoadingVideos: boolean,
  isSearchVideosSuccess: boolean,
  isSearchVideosError: any,
}
