import {AuthState} from '../states/auth.state';
import {AuthModel} from '../../models/auth.model';
import {createReducer, on} from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

const initialState: AuthState = {
  auth: <AuthModel>{},
  isAuthenticating: false,
  error: null
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
  })
)
