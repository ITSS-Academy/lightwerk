import {Component, inject, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {ProfileComponent} from '../../profile.component';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ProfileState} from '../../../../ngrx/states/profile.state';
import {Store} from '@ngrx/store';
import * as ProfileActions from '../../../../ngrx/actions/profile.actions';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Subscription} from 'rxjs';
import {AvatarPipe} from '../../../../utils/avatar.pipe';

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
    ReactiveFormsModule,
    AvatarPipe
  ],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.scss'
})
export class ProfileDialogComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  form: FormGroup;
  profileImageUrl: string = '';
  bioCount: number = 0;
  selectedFile: File | null = null;
  readonly dialogRef = inject(MatDialogRef<ProfileComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private store: Store<{
                profile: ProfileState
              }
              >
  ) {

    this.form = new FormGroup({
      username: new FormControl(data?.username || '', [
        Validators.required,
      ]),
      bio: new FormControl(data?.bio || '', [
        Validators.maxLength(80)
      ]),
      profileImage: new FormControl<File | null>(null)
    });
    this.profileImageUrl = data?.profileImageUrl || '';
    this.bioCount = this.form.get('bio')?.value?.length || 0;
  }


  ngOnInit() {
    this.subscriptions.push(
      this.store.select(state => state.profile.isEditSuccess).subscribe(isSuccess => {
        if (isSuccess) {
          console.log('isSuccess', isSuccess);
          this.dialogRef.close();
        }
      })
    )
  }

  ngOnDestroy() {
    console.log(this.subscriptions.length)
    for (const sub of this.subscriptions) {
      console.log('Unsubscribing');
      sub.unsubscribe();
    }
    this.store.dispatch(ProfileActions.resetEditProfileState())

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

  builderProfileImageUrl(): string {
    if (this.profileImageUrl && this.profileImageUrl.startsWith('data:image')) {
      return this.profileImageUrl;
    }
    return this.data?.profileImageUrl ? `https://zkeqdgfyxlmcrmfehjde.supabase.co/storage/v1/object/public/avatars/${this.data?.profileImageUrl}` : 'https://zkeqdgfyxlmcrmfehjde.supabase.co/storage/v1/object/public/avatars/defaults/default.svg';
  }


  updateBioCount(): void {
    this.bioCount = this.form.get('bio')?.value?.length || 0;
  }

  onSave() {
    if (this.form.valid) {
      this.store.dispatch(ProfileActions.editProfileUser({
        username: this.form.get('username')?.value,
        bio: this.form.get('bio')?.value,
        avatarUrl: this.selectedFile
      }));

      console.log('Form Data to be submitted:', this.form.value);
    }
  }

}
