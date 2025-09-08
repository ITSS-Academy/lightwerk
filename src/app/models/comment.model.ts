export interface CommentModel {
  id: string;
  profileId: string;
  videoId: string;
  content: string;
  createdAt: string;
  profile?: {
    id: string;
    username: string;
    avatarUrl: string | null;
  }
}
