import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject,} from '@angular/core'
import {catchError, exhaustMap, map, of} from 'rxjs';
import * as PlaylistActions from '../actions/playlist.actions';
import {PlaylistService} from '../../services/playlist/playlist.service';

//create playlist

export const createPlaylist = createEffect(
  (actions$: Actions = inject(Actions), playlistService: PlaylistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.createPlaylist),
      exhaustMap((action) =>
        playlistService.createPlaylist(action.title, action.isPublic, action.thumbnail).pipe(
          map((playlist) => PlaylistActions.createPlaylistSuccess({playlist: playlist})),
          catchError((error: any) =>
            of(PlaylistActions.createPlaylistFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
)

//delete playlist

export const deletePlaylist = createEffect(
  (actions$: Actions = inject(Actions), playlistService: PlaylistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.deletePlaylist),
      exhaustMap((action) =>
        playlistService.deletePlaylist(action.playListID).pipe(
          map(() => PlaylistActions.deletePlaylistSuccess({playListID: action.playListID})),
          catchError((error: any) =>
            of(PlaylistActions.deletePlaylistFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
)

//load all playlists

export const loadAllPlaylists = createEffect(
  (actions$: Actions = inject(Actions), playlistService: PlaylistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.loadAllPlaylists),
      exhaustMap((action) =>
        playlistService.getAllPlaylists(action.profileID).pipe(
          map((playlists) => PlaylistActions.loadAllPlaylistsSuccess({playlists: playlists})),
          catchError((error: any) =>
            of(PlaylistActions.loadAllPlaylistsFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
)

//load playlist details

export const loadPlaylistDetails = createEffect(
  (actions$: Actions = inject(Actions), playlistService: PlaylistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.loadPlaylistDetails),
      exhaustMap((action) =>
        playlistService.getPlaylistDetails(action.playlistID).pipe(
          map((playlist) => PlaylistActions.loadPlaylistDetailsSuccess({playlist: playlist})),
          catchError((error: any) =>
            of(PlaylistActions.loadPlaylistDetailsFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
)
