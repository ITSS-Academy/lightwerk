import {VideoModel} from './video.model';

export interface PlaylistModel {
  id: string;
  profileId: string;
  title: string | null;
  thumbnailPath: string;
  isPublic: boolean;
  createdAt: string;
  videos?: VideoModel[];
  isHaveVideo?: boolean;
}
