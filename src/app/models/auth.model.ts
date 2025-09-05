export interface AuthModel {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: UserModel;
}

export interface UserModel {
  id: string;
}
