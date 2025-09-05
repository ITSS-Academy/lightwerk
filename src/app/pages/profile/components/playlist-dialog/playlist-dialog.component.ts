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
import {MatIcon} from '@angular/material/icon';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';

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
    MatIcon,
    MatRadioGroup,
    MatRadioButton,
  ],
  templateUrl: './playlist-dialog.component.html',
  styleUrl: './playlist-dialog.component.scss'
})
export class PlaylistDialogComponent {
  thumbnail: string = '';
  selectedFile: File | null = null
  readonly dialogRef = inject(MatDialogRef<PlaylistComponent>);
  form: FormGroup;
  nameCount: number = 0


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = new FormGroup({
      name: new FormControl(data?.name || '', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.]+$/)]),
      description: new FormControl(data?.name || ''),

      isPrivate: new FormControl('true')
    });
    this.thumbnail = data?.thumbnail || '';
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

  onEditPhotoClick(): void {
    const fileInput = document.getElementById('thumbnail-photo-input') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.isValidImageFile(file)) {
        this.selectedFile = file;
        this.previewImage(file);
        console.log(this.selectedFile);
        this.form.get('profileImage')?.setValue(file);
        this.form.get('profileImage')?.updateValueAndValidity();
      } else {
        alert('Please select a valid image file (JPG, PNG, GIF)');
        this.form.get('profileImage')?.setValue(null);
        this.form.get('profileImage')?.updateValueAndValidity();
      }
    }
  }

  private isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024;
    return validTypes.includes(file.type) && file.size <= maxSize;
  }

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.thumbnail = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}
