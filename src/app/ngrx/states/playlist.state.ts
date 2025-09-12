import {PlaylistModel} from '../../models/playlist.model';

export interface PlaylistState {
  title: string;
  isPublic: boolean;
  thumbnailPath?: string;
  isCreating: boolean;
  isCreateSuccess: boolean;
  isCreateError: any;

  playListID: string;
  profileID?: string;
  isDeleting: boolean;
  isDeleteSuccess: boolean;
  isDeleteError: any;

  playlists: PlaylistModel[];
  isLoadingPlaylists: boolean;
  loadPlaylistsError: any;
  isLoadPlaylistsSuccess: boolean;


  playListDetail: PlaylistModel;
  isLoadingPlaylistDetails: boolean;
  loadPlaylistDetailsError: any;

  isAddingToPlaylist: boolean;
  addToPlaylistSuccess: boolean;
  addToPlaylistError: any;

  isRemovingFromPlaylist: boolean;
  removeFromPlaylistSuccess: boolean;
  removeFromPlaylistError: any;

  isAddingToSpecificPlaylist: boolean;
  addToSpecificPlaylistSuccess: boolean;
  addToSpecificPlaylistError: any;

  isRemovingFromSpecificPlaylist: boolean;
  removeFromSpecificPlaylistSuccess: boolean;
  removeFromSpecificPlaylistError: any;

  isGettingVideoInPlaylist: boolean;
  getVideoInPlaylistSuccess: boolean;
  getVideoInPlaylistError: any;
  isHaveVideoInPlaylist: boolean;
}
