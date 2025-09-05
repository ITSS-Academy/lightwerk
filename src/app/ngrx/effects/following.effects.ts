import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import * as followingActions from '../actions/following.actions';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {VideoService} from '../../services/video/video.service';

export const getVideosFollowedChannels = createEffect(
  (actions$ = inject(Actions), videoService = inject(VideoService)) => {
    return actions$.pipe(
      ofType(followingActions.getVideosFollowedChannels),
      exhaustMap(({page}) =>
        videoService.getVideosByFollowedProfiles(page).pipe(
          map((res) => followingActions.getVideosFollowedChannelsSuccess({
            videos: res.videos,
            totalItems: res.pagination.totalCount
          })),
          catchError((error: any) =>
            of(followingActions.getVideosFollowedChannelsFailure({error}))
          )
        )
      )
    );
  },
  {functional: true}
)
