import {AuthState} from '../states/auth.state';
import {AuthModel} from '../../models/auth.model';
import {createReducer, on} from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import {ProfileModel} from '../../models/profile.model';

const initialState: AuthState = {
  auth: <AuthModel>{},
  isAuthenticating: false,
  error: null,

  profile: <ProfileModel>{},
  isLoadingProfile: false,
  profileError: null,
}

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isAuthenticating: true,
      error: null
    }
  }),
  on(AuthActions.loginSuccess, (state, {type}) => {
      console.log(type);
      return {
        ...state,
        isAuthenticating: false,
        error: null
      }

    }
  ),
  on(AuthActions.loginFailure, (state, {error}) => ({
    ...state,
    isAuthenticating: false,
    error
  })),
  on(AuthActions.storeAuth, (state, {auth}) => ({
    ...state,
    isAuthenticating: false,
    auth
  })),
  on(AuthActions.logout, (state, {type}) => {
    console.log(type);
    return initialState
  }),
  on(AuthActions.getCurrentUser, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isLoadingProfile: true,
      profileError: null
    }
  }),
  on(AuthActions.getCurrentUserSuccess, (state, {profile}) => ({
    ...state,
    isLoadingProfile: false,
    profile,
    profileError: null
  })),
  on(AuthActions.getCurrentUserFailure, (state, {error}) => ({
      ...state,
      isLoadingProfile: false,
      profileError: error
    })
  )
)
