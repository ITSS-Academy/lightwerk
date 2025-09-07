import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {HistoryService} from '../../services/history/history.service';
import * as HistoryActions from '../actions/history.actions';
import {exhaustMap, from, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

export const getHistoryVideos = createEffect(
  (actions$: Actions = inject(Actions), historyService = inject(HistoryService)) => {
    return actions$.pipe(
      ofType(HistoryActions.getAllHistory),
      exhaustMap(() =>
        from(historyService.getHistory()).pipe(
          map((res) => HistoryActions.getAllHistorySuccess({history: res})),
          catchError((error: any) =>
            of(HistoryActions.getAllHistoryFailure({error: error}))
          )
        )
      )
    )
  },
  {functional: true}
)

export const deleteHistoryVideo$ = createEffect(
  (actions$: Actions = inject(Actions), historyService = inject(HistoryService)) => {
    return actions$.pipe(
      ofType(HistoryActions.deleteHistoryVideo),
      exhaustMap(action =>
        from(historyService.deleteFromHistory(action.videoId)).pipe(
          map(() => HistoryActions.deleteHistoryVideoSuccess({ videoId: action.videoId })),
          catchError(error => of(HistoryActions.deleteHistoryVideoFailure({ error })))
        )
      )
    )
  },
  { functional: true }
);
