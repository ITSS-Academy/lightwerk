import {ProfileModel} from './profile.model';

export interface CommentModel {
  id: string;
  profileId: string;
  videoId: string;
  content: string;
  createdAt: string;
  profile?: ProfileModel
}
