import {AuthModel} from '../../models/auth.model';

export interface AuthState {
  auth: AuthModel
  isAuthenticating: boolean;
  error: any
}
