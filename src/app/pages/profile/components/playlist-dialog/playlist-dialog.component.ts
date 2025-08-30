import {Component, Inject, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {PlaylistComponent} from '../playlist/playlist.component';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-playlist-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatFormField,
    MatInput,
    MatError,
    MatLabel,
  ],
  templateUrl: './playlist-dialog.component.html',
  styleUrl: './playlist-dialog.component.scss'
})
export class PlaylistDialogComponent {
  readonly dialogRef = inject(MatDialogRef<PlaylistComponent>);
  form: FormGroup;
  nameCount: number = 0


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = new FormGroup({
      name: new FormControl(data?.name || '', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.]+$/)]),
      isPrivate: new FormControl(data?.isPrivate)
    });
    this.nameCount = this.form.get('nameCount')?.value?.length || 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateNameCount(): void {
    this.nameCount = this.form.get('nameCount')?.value?.length || 0;
  }

  onSave() {
    if (!this.form.invalid) {
      this.dialogRef.close({
        name: this.form.get('name')?.value,
        isPrivate: this.form.get('isPrivate')?.value,
      });
    }
  }
}
