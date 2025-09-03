export interface VideoModel {
  id: string;
  profileId: string;
  title: string | null;
  description: string | null;
  categoryId: string | null;
  thumbnailPath: string;
  aspectRatio: string;
  width: string;
  height: string;
  duration: number;
  viewCount: number;
  isPublic: boolean;
  status: 'editing' | 'processing' | 'success'
  createdAt: string;
  category?: {
    id: string;
    name: string;
  },
  profile?: {
    id: string;
    username: string;
    avatarPath: string | null;
  }
}

export interface UploadVideoModel {

  id: string;
  title: string;
  description: string;
  categoryId: string;
  isPublic: boolean;
  thumbnail: File | null

}
