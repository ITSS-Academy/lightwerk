import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject,} from '@angular/core'
import * as likeVideoActions from '../actions/like-video.actions';
import {catchError, exhaustMap, from, map, of, switchMap} from 'rxjs';
import {LikeVideoService} from '../../services/like-video/like-video.service';


export const deleteLikeVideo = createEffect(
  (actions$: Actions = inject(Actions), likeVideoService: LikeVideoService = inject(LikeVideoService)) => {
    return actions$.pipe(
      ofType(likeVideoActions.deleteLikeVideo),
      switchMap((action) =>
        from(likeVideoService.deleteLikeVideo(action.videoId)).pipe(
          map((res) => likeVideoActions.deleteLikeVideoSuccess()),
          catchError((error: any) =>
            of(likeVideoActions.createLikeVideoFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
)

export const addLikeVideo = createEffect(
  (actions$: Actions = inject(Actions), likeVideoService: LikeVideoService = inject(LikeVideoService)) => {
    return actions$.pipe(
      ofType(likeVideoActions.createLikeVideo),
      switchMap((action) =>
        from(likeVideoService.addLikeVideo(action.videoId)).pipe(
          map((res) => likeVideoActions.createLikeVideoSuccess()),
          catchError((error: any) =>
            of(likeVideoActions.createLikeVideoFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
)
