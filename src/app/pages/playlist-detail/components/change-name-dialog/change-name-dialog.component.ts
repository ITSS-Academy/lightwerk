import {Component, inject} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {PlaylistState} from '../../../../ngrx/states/playlist.state';
import * as PlaylistActions from '../../../../ngrx/actions/playlist.actions';
import {model} from '@angular/core';

@Component({
  selector: 'app-change-name-dialog',
  imports: [
    MatFormField,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './change-name-dialog.component.html',
  styleUrl: './change-name-dialog.component.scss'
})
export class ChangeNameDialogComponent {
  nameFormControl = new FormControl('', Validators.required);
  readonly dialogRef = inject(MatDialogRef<ChangeNameDialogComponent>);
  readonly data = inject<{ playlistId: string }>(MAT_DIALOG_DATA);
  readonly playlistId = model(this.data.playlistId);
  private store = inject(Store<{ playlist: PlaylistState }>);

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    if (this.nameFormControl.valid) {
      this.store.dispatch(PlaylistActions.changeNameOfPlaylist({
        playlistID: this.playlistId(),
        newTitle: this.nameFormControl.value || ''
      }));
      this.dialogRef.close();
    }
  }
}
