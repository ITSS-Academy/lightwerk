import {createReducer, on} from '@ngrx/store';
import {PlaylistState} from '../states/playlist.state';
import * as PlaylistActions from '../actions/playlist.actions';
import {PlaylistModel} from '../../models/playlist.model';

export const initialState: PlaylistState = {
  title: '',
  isPublic: false,
  thumbnailPath: undefined,
  isCreating: false,
  isCreateSuccess: false,
  isCreateError: null,

  playListID: '',
  profileID: '',
  isDeleting: false,
  isDeleteSuccess: false,
  isDeleteError: null,

  playlists: [],
  isLoadingPlaylists: false,
  loadPlaylistsError: null,
  isLoadPlaylistsSuccess: false,

  playListDetail: <PlaylistModel>{},
  isLoadingPlaylistDetails: false,
  loadPlaylistDetailsError: null,

  isAddingToPlaylist: false,
  addToPlaylistSuccess: false,
  addToPlaylistError: null
}

export const playlistReducer = createReducer(
  initialState,
  //create playlist

  on(PlaylistActions.createPlaylist, (state, {title, isPublic, thumbnail}) => {
    return {
      ...state,
      title: title,
      isPublic: isPublic,
      thumbnailPath: thumbnail ? URL.createObjectURL(thumbnail) : undefined,
      isCreating: true,
      isCreateSuccess: false,
      isCreateError: null
    }
  }),

  on(PlaylistActions.createPlaylistSuccess, (state, {playlist}) => {
    return {
      ...state,
      title: '',
      isPublic: false,
      thumbnailPath: undefined,
      isCreating: false,
      isCreateSuccess: true,
      isCreateError: null,
      playlists: playlist ? [playlist, ...state.playlists] : state.playlists
    }
  }),

  on(PlaylistActions.createPlaylistFailure, (state, {error}) => {
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: false,
      isCreateError: error
    }
  }),

  //delete playlist
  on(PlaylistActions.deletePlaylist, (state, {playListID, profileID}) => {
    return {
      ...state,
      playListID: playListID,
      profileID: profileID,
      isDeleting: true,
      isDeleteSuccess: false,
      isDeleteError: null
    }
  }),
  on(PlaylistActions.deletePlaylistSuccess, (state) => {
    return {
      ...state,
      playListID: '',
      isDeleting: false,
      isDeleteSuccess: true,
      isDeleteError: null
    }
  }), on(PlaylistActions.deletePlaylistFailure, (state, {error}) => {
    return {
      ...state,
      isDeleting: false,
      isDeleteSuccess: false,
      isDeleteError: error
    }
  }),
  on(PlaylistActions.resetPlaylistState, (state) => initialState),
  //get all playlists


  on(PlaylistActions.loadAllPlaylists, (state) => {
    return {
      ...state,
      isLoadingPlaylists: true,
      loadPlaylistsError: null
    }
  }),

  on(PlaylistActions.loadAllPlaylistsSuccess, (state, {playlists}) => {
    return {
      ...state,
      playlists: playlists,
      isLoadingPlaylists: false,
      loadPlaylistsError: null
    }
  }),

  on(PlaylistActions.loadAllPlaylistsFailure, (state, {error}) => {
    return {
      ...state,
      isLoadingPlaylists: false,
      loadPlaylistsError: error
    }
  }),
  on(PlaylistActions.clearCreatePlaylistState, (state) => ({
      ...state,
      title: '',
      isPublic: false,
      thumbnailPath: undefined,
      isCreating: false,
      isCreateSuccess: false,
      isCreateError: null
    })
  ),
  on(PlaylistActions.clearDeletePlaylistState, (state) => ({
      ...state,
      playListID: '',
      profileID: '',
      isDeleting: false,
      isDeleteSuccess: false,
      isDeleteError: null
    })
  ),
  //get playlist details

  on(PlaylistActions.loadPlaylistDetails, (state) => {
      return {
        ...state,
        isLoadingPlaylistDetails: true,
        loadPlaylistDetailsError: null
      }
    }
  ),

  on(PlaylistActions.loadPlaylistDetailsSuccess, (state, {playlist}) => {
      return {
        ...state,
        playListDetail: playlist,
        isLoadingPlaylistDetails: false,
        loadPlaylistDetailsError: null
      }
    }
  ),

  on(PlaylistActions.loadPlaylistDetailsFailure, (state, {error}) => {
    return {
      ...state,
      isLoadingPlaylistDetails: false,
      loadPlaylistDetailsError: error
    }
  }),
  on(PlaylistActions.getAllPlaylistsAndVideoInPlaylist, (state) => ({
      ...state,
      isLoadingPlaylists: true,
      loadPlaylistsError: null,
      isLoadPlaylistsSuccess: false,
    }),
  ),
  on(PlaylistActions.getAllPlaylistsAndVideoInPlaylistSuccess, (state, {playlists}) => ({
      ...state,
      playlists: playlists,
      isLoadingPlaylists: false,
      loadPlaylistsError: null,
      isLoadPlaylistsSuccess: true,
    })
  ),
  on(PlaylistActions.getAllPlaylistsAndVideoInPlaylistFailure, (state, {error}) => ({
      ...state,
      isLoadingPlaylists: false,
      loadPlaylistsError: error,
      isLoadPlaylistsSuccess: false,
    })
  ),
  on(PlaylistActions.addVideoToPlaylist, (state) => ({
      ...state,
      isAddingToPlaylist: true,
      addToPlaylistSuccess: false,
      addToPlaylistError: null
    })
  ),
  on(PlaylistActions.addVideoToPlaylistSuccess, (state) => ({
      ...state,
      isAddingToPlaylist: false,
      addToPlaylistSuccess: true,
      addToPlaylistError: null
    })
  ),
  on(PlaylistActions.addVideoToPlaylistFailure, (state, {error}) => ({
      ...state,
      isAddingToPlaylist: false,
      addToPlaylistSuccess: false,
      addToPlaylistError: error
    })
  ),
)
