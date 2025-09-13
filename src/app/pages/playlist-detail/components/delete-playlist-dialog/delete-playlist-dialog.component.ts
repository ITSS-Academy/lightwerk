import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import * as PlaylistActions from '../../../../ngrx/actions/playlist.actions';

@Component({
  selector: 'app-delete-playlist-dialog',
  imports: [
    MatButton
  ],
  templateUrl: './delete-playlist-dialog.component.html',
  styleUrl: './delete-playlist-dialog.component.scss'
})
export class DeletePlaylistDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeletePlaylistDialogComponent>);
  readonly data = inject<{ playlistId: string, profileId?: string }>(MAT_DIALOG_DATA);
  private store = inject(Store);

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.store.dispatch(PlaylistActions.deletePlaylist({
      playListID: this.data.playlistId,
      profileID: this.data.profileId
    }));
    // Optionally close dialog here, or let parent handle it after success
    this.dialogRef.close();
  }
}
