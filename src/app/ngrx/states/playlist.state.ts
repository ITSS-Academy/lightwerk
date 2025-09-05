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


  playListDetail: PlaylistModel;
  isLoadingPlaylistDetails: boolean;
  loadPlaylistDetailsError: any;
}
