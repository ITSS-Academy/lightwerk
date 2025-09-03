import {Component, inject, Inject} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {ProfileComponent} from '../../profile.component';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-profile-dialog',
  imports: [
    MatDialogContent,
    MatFormField,
    MatButton,
    MatInput,
    MatDialogTitle,
    MatDialogActions,
    MatIcon,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.scss'
})
export class ProfileDialogComponent {
  form: FormGroup;
  profileImageUrl: string = '';
  bioCount: number = 0;
  selectedFile: File | null = null;
  readonly dialogRef = inject(MatDialogRef<ProfileComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = new FormGroup({
      username: new FormControl(data?.username || '', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.]+$/)
      ]),
      bio: new FormControl(data?.bio || '', [
        Validators.maxLength(80)
      ]),
      profileImage: new FormControl(null, [Validators.required])
    });
    this.profileImageUrl = data?.profileImageUrl || '';
    this.bioCount = this.form.get('bio')?.value?.length || 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEditPhotoClick(): void {
    const fileInput = document.getElementById('profile-photo-input') as HTMLInputElement;
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
      this.profileImageUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }


  updateBioCount(): void {
    this.bioCount = this.form.get('bio')?.value?.length || 0;
  }

  onSave() {
    if (!this.form.invalid) {
      this.dialogRef.close({
        bio: this.form.get('bio')?.value,
        username: this.form.get('username')?.value,
        profileImageUrl: this.profileImageUrl
      });
    }
  }
}
