import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {VideoService} from '../../services/video/video.service';
import * as VideoActions from '../actions/video.actions';
import {catchError, exhaustMap, map, of, switchMap} from 'rxjs';

export const uploadVideo = createEffect(
  (actions$ = inject(Actions), videoService = inject(VideoService)) => {
    return actions$.pipe(
      ofType(VideoActions.uploadVideo),
      exhaustMap((action) =>
        videoService.chunkVideo(action.file).pipe(
          switchMap((res) => {
              console.log(res)
              return videoService.mergeChunks(res[0].videoId).pipe(
                map((video) => VideoActions.uploadVideoSuccess({video})),
                catchError((error: any) =>
                  of(VideoActions.uploadVideoFailure({error: error}))
                )
              )
            }
          ),
          catchError((error: any) =>
            of(VideoActions.uploadVideoFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
);
