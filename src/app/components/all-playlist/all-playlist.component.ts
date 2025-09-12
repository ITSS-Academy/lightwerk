import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PlaylistDialogComponent} from '../../pages/profile/components/playlist-dialog/playlist-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe, NgClass} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {PlaylistModel} from '../../models/playlist.model';
import {Store} from '@ngrx/store';
import {PlaylistState} from '../../ngrx/states/playlist.state';
import supabase from '../../utils/supabase';
import * as PlaylistActions from '../../ngrx/actions/playlist.actions';
import {Observable, Subscription} from 'rxjs';
import {convertToSupabaseUrl} from '../../utils/img-converter';

interface DialogData {
  videoId: string
}

@Component({
  selector: 'app-all-playlist',
  imports: [MatIconModule, NgClass, MatButtonModule, MatCheckboxModule, FormsModule, AsyncPipe],
  templateUrl: './all-playlist.component.html',
  styleUrl: './all-playlist.component.scss'
})
export class AllPlaylistComponent implements OnInit, OnDestroy {
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  playlists: PlaylistModel[] = [];
  subscriptions: Subscription[] = [];
  isAddingToPlaylist = false;
  isRemovingFromPlaylist = false;
  isLoadingPlaylists$: Observable<boolean>

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<AllPlaylistComponent>,
              private store: Store<{
                playlist: PlaylistState
              }>
  ) {
    this.isLoadingPlaylists$ = this.store.select(state => state.playlist.isLoadingPlaylists);
  }

  ngOnInit() {
    supabase.auth.getUser().then(({data: {user}}) => {
      if (user?.id) {
        this.store.dispatch(PlaylistActions.getAllPlaylistsAndVideoInPlaylist({
          profileID: user.id,
          videoID: this.data['videoId']
        }));
      }
    });

    this.subscriptions.push(
      this.store.select(state => state.playlist.playlists).subscribe(playlists => {
        this.playlists = playlists;
        console.log(this.playlists);
      })
    );
    this.subscriptions.push(
      this.store.select(state => state.playlist.isAddingToPlaylist).subscribe(val => {
        this.isAddingToPlaylist = val;
      })
    );
    this.subscriptions.push(
      this.store.select(state => state.playlist.isRemovingFromPlaylist).subscribe(val => {
        this.isRemovingFromPlaylist = val;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  openCreatePlaylistDialog() {
    this.dialogRef.close();
    this.dialog.open(PlaylistDialogComponent, {
      width: '400px'
    });
  }


  onCardClick(playlist: PlaylistModel) {
    if (!this.isAddingToPlaylist && !this.isRemovingFromPlaylist) {
      console.log(playlist)
      this.onCheckboxChange(playlist);
    }
  }

  onCheckboxChange(playlist: PlaylistModel) {
    if (!playlist.isHaveVideo) {
      this.store.dispatch(PlaylistActions.addVideoToSpecificPlaylist({
        videoID: this.data.videoId,
        playlistID: playlist.id
      }));
    } else {
      this.store.dispatch(PlaylistActions.removeVideoFromSpecificPlaylist({
        videoID: this.data.videoId,
        playlistID: playlist.id
      }));
    }
  }

  onClose() {
    // Check if all playlists are unchecked (isHaveVideo === false)
    const allUnchecked = !this.playlists || this.playlists.length === 0 || this.playlists.every(p => !p.isHaveVideo);
    if (allUnchecked) {
      this.dialogRef.close(false);
    } else {
      this.dialogRef.close(this.playlists);
    }
  }

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;
}
