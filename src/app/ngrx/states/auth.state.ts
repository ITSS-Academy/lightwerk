import {AuthModel} from '../../models/auth.model';
import {ProfileModel} from '../../models/profile.model';

export interface AuthState {
  auth: AuthModel
  isAuthenticating: boolean;
  error: any,

  profile: ProfileModel;
  isLoadingProfile: boolean;
  profileError: any;
}
