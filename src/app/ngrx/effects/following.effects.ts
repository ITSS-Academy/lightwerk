import * as FollowingActions from '../actions/following.actions';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {FollowingService} from '../../services/following/following.service';
import {exhaustMap, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

export const getFollowingVideos = createEffect(
  (
    actions$: Actions = inject(Actions),
    followingService: FollowingService = inject(FollowingService)
  ) => {
    return actions$.pipe(
      ofType(FollowingActions.getFollowingVideoList),
      exhaustMap(() =>
        followingService.getAllVideosFollowing().pipe(
          map((res) =>
            FollowingActions.getFollowingVideoListSuccess({videos: res.videos})
          ),
          catchError((error: any) =>
            of(FollowingActions.getFollowingVideoListFailure({error}))
          )
        )
      )
    );
  },
  {functional: true}
);
