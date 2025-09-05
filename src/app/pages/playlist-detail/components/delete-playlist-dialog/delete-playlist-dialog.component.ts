import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialogRef} from '@angular/material/dialog';

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

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close();

  }
}
