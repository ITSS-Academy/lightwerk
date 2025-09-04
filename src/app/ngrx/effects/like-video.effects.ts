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

export const deleteLikeVideo = createEffect(
  (actions$: Actions = inject(Actions), likeVideoService: LikeVideoService = inject(LikeVideoService)) => {
    return actions$.pipe(
      ofType(likeVideoActions.clearLikeVideoState),
      exhaustMap((action) =>
        likeVideoService.deleteLikeVideo(action.videoId, action.profileId).pipe(
          map((res) => likeVideoActions.clearLikeVideoStateSuccess({countAfterDelete: res.count})),
          catchError((error: any) =>
            of(likeVideoActions.createLikeVideoStateFailure({error: error}))
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
      ofType(likeVideoActions.createLikeVideoState),
      exhaustMap((action) =>
        likeVideoService.addLikeVideo(action.videoId, action.profileId).pipe(
          map((res) => likeVideoActions.createLikeVideoStateSuccess({countAfterCreate: res.count})),
          catchError((error: any) =>
            of(likeVideoActions.createLikeVideoStateFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
)
