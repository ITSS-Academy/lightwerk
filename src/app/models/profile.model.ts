export interface ProfileModel {
  id: string;
  username: string;
  avatarUrl: string;
  bio?: string;
  isFollowing?: boolean;
}
