export interface ProfileModel {
  id: string;
  username: string;
  avatarPath: string;
  bio?: string;
  isFollowing?: boolean;
  followingCount?: number;
  followersCount?: number;
}
