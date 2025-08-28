export interface AuthModel {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface UserModel {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: string;
}
