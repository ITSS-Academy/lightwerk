import {Component, EventEmitter, inject, Input, model, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {Store} from '@ngrx/store';
import {PlaylistState} from '../../../../ngrx/states/playlist.state';
import * as PlaylistActions from '../../../../ngrx/actions/playlist.actions';
import {Observable} from 'rxjs';
import {PlaylistModel} from '../../../../models/playlist.model';
import {AsyncPipe} from '@angular/common';

interface DialogData {
  playlistId: string;
}

@Component({
  selector: 'app-make-public-dialog',
  imports: [
    MatIcon,
    MatSlideToggle,
    AsyncPipe
  ],
  templateUrl: './make-public-dialog.component.html',
  styleUrl: './make-public-dialog.component.scss'
})
export class MakePublicDialogComponent {
  playlistDetail$: Observable<PlaylistModel>
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly playlistId = model(this.data.playlistId);

  constructor(private dialogRef: MatDialogRef<MakePublicDialogComponent>, private store: Store<{
    playlist: PlaylistState
  }>) {
    this.playlistDetail$ = this.store.select(state => state.playlist.playListDetail)
  }

  togglePrivacy(privateStatus: boolean) {
    this.store.dispatch(PlaylistActions.changePrivacyOfPlaylist({
      playlistID: this.playlistId(),
      isPublic: privateStatus
    }));
  }


}
