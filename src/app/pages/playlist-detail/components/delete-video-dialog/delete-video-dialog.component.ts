import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-video-dialog',
  imports: [
    MatButton
  ],
  templateUrl: './delete-video-dialog.component.html',
  styleUrl: './delete-video-dialog.component.scss'
})
export class DeleteVideoDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteVideoDialogComponent>);


  onNoClick() {
      this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close();
  }
}
