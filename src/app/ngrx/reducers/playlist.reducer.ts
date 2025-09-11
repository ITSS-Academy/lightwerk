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
  addToPlaylistError: null,

  isRemovingFromPlaylist: false,
  removeFromPlaylistSuccess: false,
  removeFromPlaylistError: null,

  isAddingToSpecificPlaylist: false,
  addToSpecificPlaylistSuccess: false,
  addToSpecificPlaylistError: null,

  isRemovingFromSpecificPlaylist: false,
  removeFromSpecificPlaylistSuccess: false,
  removeFromSpecificPlaylistError: null,
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
  on(PlaylistActions.removeVideoFromPlaylist, (state) => ({
      ...state,
      isRemovingFromPlaylist: true,
      removeFromPlaylistSuccess: false,
      removeFromPlaylistError: null
    })
  ),
  on(PlaylistActions.removeVideoFromPlaylistSuccess, (state) => ({
      ...state,
      isRemovingFromPlaylist: false,
      removeFromPlaylistSuccess: true,
      removeFromPlaylistError: null
    })
  ),
  on(PlaylistActions.removeVideoFromPlaylistFailure, (state, {error}) => ({
      ...state,
      isRemovingFromPlaylist: false,
      removeFromPlaylistSuccess: false,
      removeFromPlaylistError: error
    })
  ),

  on(PlaylistActions.clearPlaylistSate, () => initialState),

  on(PlaylistActions.addVideoToSpecificPlaylist, (state) => ({
      ...state,
      isAddingToSpecificPlaylist: true,
      addToSpecificPlaylistSuccess: false,
      addToSpecificPlaylistError: null
    })
  ),
  on(PlaylistActions.addVideoToSpecificPlaylistSuccess, (state, {type, playlistID}) => {
      const newPlaylists = state.playlists.map(playlist => {
          if (playlistID === playlist.id) {
            return {...playlist, isHaveVideo: true};
          }
          return playlist;
        }
      )
      console.log(type, playlistID, state.playlists, newPlaylists);
      return {
        ...state,
        playlists: newPlaylists,
        isAddingToSpecificPlaylist: false,
        addToSpecificPlaylistSuccess: true,
        addToSpecificPlaylistError: null
      }
    }
  ),
  on(PlaylistActions.addVideoToSpecificPlaylistFailure, (state, {error}) => ({
      ...state,
      isAddingToSpecificPlaylist: false,
      addToSpecificPlaylistSuccess: false,
      addToSpecificPlaylistError: error
    })
  ),
  on(PlaylistActions.removeVideoFromSpecificPlaylist, (state) => ({
      ...state,
      isRemovingFromSpecificPlaylist: true,
      removeFromSpecificPlaylistSuccess: false,
      removeFromSpecificPlaylistError: null
    })
  ),
  on(PlaylistActions.removeVideoFromSpecificPlaylistSuccess, (state, {playlistID}) => {
      const newPlaylists = state.playlists.map(playlist => {
          if (playlistID === playlist.id) {
            return {...playlist, isHaveVideo: false};
          }
          return playlist;
        }
      )
      return {
        ...state,
        playlists: newPlaylists,
        isRemovingFromSpecificPlaylist: false,
        removeFromSpecificPlaylistSuccess: true,
        removeFromSpecificPlaylistError: null
      }
    }
  ),
  on(PlaylistActions.removeVideoFromSpecificPlaylistFailure, (state, {error}) => ({
      ...state,
      isRemovingFromSpecificPlaylist: false,
      removeFromSpecificPlaylistSuccess: false,
      removeFromSpecificPlaylistError: error
    })
  ),
)
