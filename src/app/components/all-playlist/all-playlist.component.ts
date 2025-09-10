import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PlaylistDialogComponent} from '../../pages/profile/components/playlist-dialog/playlist-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {NgClass} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {PlaylistModel} from '../../models/playlist.model';
import {Store} from '@ngrx/store';
import {PlaylistState} from '../../ngrx/states/playlist.state';
import supabase from '../../utils/supabase';
import * as PlaylistActions from '../../ngrx/actions/playlist.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-all-playlist',
  imports: [MatIconModule, NgClass, MatButtonModule, MatCheckboxModule, FormsModule],
  templateUrl: './all-playlist.component.html',
  styleUrl: './all-playlist.component.scss'
})
export class AllPlaylistComponent implements OnInit, OnDestroy {
  playlists: PlaylistModel[] = [];
  subscriptions: Subscription[] = [];

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<AllPlaylistComponent>,
              private store: Store<{
                playlist: PlaylistState
              }>
  ) {
  }

  ngOnInit() {
    supabase.auth.getUser().then(({data: {user}}) => {
      if (user?.id) {
        this.store.dispatch(PlaylistActions.loadAllPlaylists({profileID: user.id}));
      }
    });

    this.subscriptions.push(
      this.store.select(state => state.playlist.playlists).subscribe(playlists => {
        this.playlists = playlists;
      })
    )
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

  addToPlaylist(playlist: PlaylistModel) {

  }
}
