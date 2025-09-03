import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject,} from '@angular/core'
import * as likeVideoActions from '../actions/like-video.actions';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {LikeVideoService} from '../../services/like-video/like-video.service';

export const getLikeCount = createEffect(
  (actions$: Actions = inject(Actions), likeVideoService: LikeVideoService = inject(LikeVideoService)) => {
    return actions$.pipe(
      ofType(likeVideoActions.getAllLikeVideos),
      exhaustMap((action) =>
        likeVideoService.getLikeCount(action.videoId).pipe(
          map((res) => likeVideoActions.getAllLikeVideosSuccess({count: res.count})),
          catchError((error: any) =>
            of(likeVideoActions.getAllLikeVideosFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
)
