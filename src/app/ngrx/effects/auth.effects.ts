import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import * as authActions from '../actions/auth.actions';
import {catchError, exhaustMap, from, map, of} from 'rxjs';

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      exhaustMap(() =>
        from(authService.login()).pipe(
          map(() => {
            return authActions.login()
          }),
          catchError((error: any) =>
            of(authActions.loginFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
);
