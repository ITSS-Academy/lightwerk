import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ProfileService} from '../../services/profile/profile.service';
import * as profileActions from '../actions/profile.actions'
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

export const getUserVideosEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(profileActions.getUserVideos),
      switchMap((arg) => profileService.getUserVideo(arg.profileId, arg.page, arg.orderBy).pipe(
        map((res) => {
          console.log(res);
          return profileActions.getUserVideosSuccess({userVideos: res.videos,});
        }),
        catchError((error: { message: any }) =>
          of(profileActions.getUserVideosFailure({error}))
        ))
      )
    );
  },
  {functional: true}
)
