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

  isGettingVideoInPlaylist: false,
  getVideoInPlaylistSuccess: false,
  getVideoInPlaylistError: null,
  isHaveVideoInPlaylist: false,

  isChangingPlaylistPrivacy: false,
  changePlaylistPrivacySuccess: false,
  changePlaylistPrivacyError: null,

  isChangingPlaylistTitle: false,
  changePlaylistTitleSuccess: false,
  changePlaylistTitleError: null,
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


  on(PlaylistActions.loadAllPlaylists, (state, {type}) => {
    console.log(type)
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

  on(PlaylistActions.loadAllPlaylistsFailure, (state, {type, error}) => {
    console.log(type, error)
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
  on(PlaylistActions.getVideoInPlaylist, (state) => ({
      ...state,
      isGettingVideoInPlaylist: true,
      getVideoInPlaylistSuccess: false,
      getVideoInPlaylistError: null
    })
  ),
  on(PlaylistActions.getVideoInPlaylistSuccess, ((state, {}) => {
      return {
        ...state,
        isGettingVideoInPlaylist: false,
        getVideoInPlaylistSuccess: true,
        getVideoInPlaylistError: null,
        isHaveVideoInPlaylist: true,
      }
    }
  )),
  on(PlaylistActions.getVideoInPlaylistFailure, (state, {error}) => ({
      ...state,
      isGettingVideoInPlaylist: false,
      getVideoInPlaylistSuccess: false,
      getVideoInPlaylistError: error
    })
  ),
  on(PlaylistActions.changeNameOfPlaylist, (state) => ({
      ...state,
      isChangingPlaylistTitle: true,
      changePlaylistTitleSuccess: false,
      changePlaylistTitleError: null
    })
  ),
  on(PlaylistActions.changeNameOfPlaylistSuccess, (state, {newTitle, playlistID}) => {
      const newPlaylists = state.playlists.map(playlist => {
          if (playlistID === playlist.id) {
            return {...playlist, title: newTitle};
          }
          return playlist;
        }
      )
      return {
        ...state,
        playlists: newPlaylists,
        playListDetail: {...state.playListDetail, title: newTitle},
        isChangingPlaylistTitle: false,
        changePlaylistTitleSuccess: true,
        changePlaylistTitleError: null
      }
    }
  ),
  on(PlaylistActions.changeNameOfPlaylistFailure, (state, {error}) => ({
      ...state,
      isChangingPlaylistTitle: false,
      changePlaylistTitleSuccess: false,
      changePlaylistTitleError: error
    })
  ),
  on(PlaylistActions.changePrivacyOfPlaylist, (state) => ({
      ...state,
      isChangingPlaylistPrivacy: true,
      changePlaylistPrivacySuccess: false,
      changePlaylistPrivacyError: null
    })
  ),
  on(PlaylistActions.changePrivacyOfPlaylistSuccess, (state, {isPublic, playlistID}) => {
      const newPlaylists = state.playlists.map(playlist => {
          if (playlistID === playlist.id) {
            return {...playlist, isPublic: isPublic};
          }
          return playlist;
        }
      )
      return {
        ...state,
        playlists: newPlaylists,
        playListDetail: {
          ...state.playListDetail,
          isPublic: !state.playListDetail.isPublic
        },
        isChangingPlaylistPrivacy: false,
        changePlaylistPrivacySuccess: true,
        changePlaylistPrivacyError: null
      }
    }
  ),
  on(PlaylistActions.changePrivacyOfPlaylistFailure, (state, {error}) => ({
        ...state,
        isChangingPlaylistPrivacy: false,
        changePlaylistPrivacySuccess: false,
        changePlaylistPrivacyError: error
      }
    ),
  ),
)
