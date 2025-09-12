import {createAction, props} from '@ngrx/store';
import {PlaylistModel} from '../../models/playlist.model';

export const createPlaylist = createAction('[Playlist] Create Playlist', props<{
  title: string
  isPublic: boolean
  thumbnail?: File
}>());
export const createPlaylistSuccess = createAction('[Playlist] Create Playlist Success', props<{
  playlist?: PlaylistModel
}>());
export const createPlaylistFailure = createAction('[Playlist] Create Playlist Failure', props<{
  error: any
}>());


//delete playlist
export const deletePlaylist = createAction('[Playlist] Delete Playlist', props<{
  playListID: string,
  profileID?: string
}>());
export const deletePlaylistSuccess = createAction('[Playlist] Delete Playlist Success',
  props<{
    playListID: string
  }>());
export const deletePlaylistFailure = createAction('[Playlist] Delete Playlist Failure', props<{
  error: any
}>());

export const resetPlaylistState = createAction('[Playlist] Reset Playlist State');

//get all playlists
export const loadAllPlaylists = createAction('[Playlist] Load All Playlists', props<{
  profileID: string
}>());
export const loadAllPlaylistsSuccess = createAction('[Playlist] Load All Playlists Success', props<{
  playlists: PlaylistModel[]
}>());
export const loadAllPlaylistsFailure = createAction('[Playlist] Load All Playlists Failure', props<{
  error: any
}>());

export const clearCreatePlaylistState = createAction('[Playlist] Clear Create Playlist State');
export const clearDeletePlaylistState = createAction('[Playlist] Clear Delete Playlist State');


//get playlist details
export const loadPlaylistDetails = createAction('[Playlist] Load Playlist Details', props<{
  playlistID: string
}>());
export const loadPlaylistDetailsSuccess = createAction('[Playlist] Load Playlist Details Success', props<{
  playlist: PlaylistModel
}>());
export const loadPlaylistDetailsFailure = createAction('[Playlist] Load Playlist Details Failure', props<{
  error: any
}>());

export const getAllPlaylistsAndVideoInPlaylist = createAction('[Playlist] Get All Playlists And Video In Playlist', props<{
  profileID: string
  videoID: string
}>());

export const getAllPlaylistsAndVideoInPlaylistSuccess = createAction('[Playlist] Get All Playlists And Video In Playlist Success', props<{
  playlists: PlaylistModel[]
}>());
export const getAllPlaylistsAndVideoInPlaylistFailure = createAction('[Playlist] Get All Playlists And Video In Playlist Failure', props<{
  error: any
}>());

export const addVideoToPlaylist = createAction('[Playlist] Add Video To Playlist', props<{
  videoID: string
}>());

export const addVideoToPlaylistSuccess = createAction('[Playlist] Add Video To Playlist Success');
export const addVideoToPlaylistFailure = createAction('[Playlist] Add Video To Playlist Failure', props<{
  error: any
}>());

export const removeVideoFromPlaylist = createAction('[Playlist] Remove Video From Playlist', props<{
  videoID: string
}>());
export const removeVideoFromPlaylistSuccess = createAction('[Playlist] Remove Video From Playlist Success');
export const removeVideoFromPlaylistFailure = createAction('[Playlist] Remove Video From Playlist Failure', props<{
  error: any
}>());

export const clearPlaylistSate = createAction('[Playlist] Clear Playlist State');


export const addVideoToSpecificPlaylist = createAction('[Playlist] Add Video To Specific Playlist', props<{
  videoID: string,
  playlistID: string
}>());
export const addVideoToSpecificPlaylistSuccess = createAction('[Playlist] Add Video To Specific Playlist Success', props<{
  playlistID: string
}>());
export const addVideoToSpecificPlaylistFailure = createAction('[Playlist] Add Video To Specific Playlist Failure', props<{
  error: any
}>());

export const removeVideoFromSpecificPlaylist = createAction('[Playlist] Remove Video From Specific Playlist', props<{
  videoID: string,
  playlistID: string
}>());
export const removeVideoFromSpecificPlaylistSuccess = createAction('[Playlist] Remove Video From Specific Playlist Success', props<{
  playlistID: string
}>());
export const removeVideoFromSpecificPlaylistFailure = createAction('[Playlist] Remove Video From Specific Playlist Failure', props<{
  error: any
}>());

export const getVideoInPlaylist = createAction('[Playlist] Get Video In Playlist', props<{
  videoID: string,
}>());
export const getVideoInPlaylistSuccess = createAction('[Playlist] Get Video In Playlist Success', props<{
  isHaveVideoInPlaylist: boolean
}>());
export const getVideoInPlaylistFailure = createAction('[Playlist] Get Video In Playlist Failure', props<{
  error: any
}>());
