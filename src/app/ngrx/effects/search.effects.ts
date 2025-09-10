import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {SearchService} from '../../services/search/search.service';
import * as SearchActions from '../actions/search.actions';
import {catchError, exhaustMap, map, of} from 'rxjs';

export const searchUsers = createEffect(
  () => {
    const actions$ = inject(Actions);
    const searchService = inject(SearchService);
    return actions$.pipe(
      ofType(SearchActions.searchUsers),
      exhaustMap((action) =>
        searchService.searchUser(action.query).pipe(
          map((user) => {
            console.log(user);
            return SearchActions.searchUsersSuccess({
              users: user,
              totalItems: user ? 1 : 0
            })
          }),
          catchError((error: any) =>
            of(SearchActions.searchUsersFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const searchVideos = createEffect(
  () => {
    const actions$ = inject(Actions);
    const searchService = inject(SearchService);
    return actions$.pipe(
      ofType(SearchActions.searchVideos),
      exhaustMap((action) =>
        searchService.searchVideos(action.query).pipe(
          map((response) => SearchActions.searchVideosSuccess({
            videos: response.videos,
            totalItems: response.totalItems
          })),
          catchError((error: any) =>
            of(SearchActions.searchVideosFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
);
