import {Component, Inject, inject, OnDestroy, OnInit} from '@angular/core';
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
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {VideoState} from '../../../../ngrx/states/video.state';
import {PlaylistState} from '../../../../ngrx/states/playlist.state';
import * as PlaylistActions from '../../../../ngrx/actions/playlist.actions';

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
    MatError,
  ],
  templateUrl: './playlist-dialog.component.html',
  styleUrl: './playlist-dialog.component.scss'
})
export class PlaylistDialogComponent implements OnInit, OnDestroy {
  thumbnail: string = '';
  selectedFile: File | null = null;
  readonly dialogRef = inject(MatDialogRef<PlaylistComponent>);
  form: FormGroup;
  nameCount: number = 0;
  subscriptions: Subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<{ playlist: PlaylistState }>
  ) {
    // ✅ Khởi tạo form
    this.form = new FormGroup({
      name: new FormControl(data?.name || '', [
        Validators.required,
      ]),
      isPrivate: new FormControl(data?.isPrivate ?? true)
    });

    this.thumbnail = data?.thumbnail || '';
    this.nameCount = this.form.get('name')?.value?.length || 0;
  }

  ngOnInit(): void {

    this.subscriptions.push(
      this.form.get('name')!.valueChanges.subscribe(() => this.updateNameCount()),
      this.store.select(state => state.playlist).subscribe(playlistState => {
        if ((playlistState).isCreateSuccess) {
          console.log("Playlist created:", playlistState.playlists);
          this.dialogRef.close();
        }
      })
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateNameCount(): void {
    this.nameCount = this.form.get('name')?.value?.length || 0;
  }

  onSave(): void {
    if (this.form.valid) {
      const playlistData = {
        name: this.form.get('name')?.value,
        isPrivate: this.form.get('isPrivate')?.value,
        thumbnail: this.selectedFile ?? this.thumbnail
      };


      this.store.dispatch(PlaylistActions.createPlaylist({
        title: playlistData.name,
        isPublic: !playlistData.isPrivate,
        thumbnail: this.selectedFile ?? undefined
      }));
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
      } else {
        alert('Please select a valid image file (JPG, PNG, GIF, <5MB)');
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.store.dispatch(PlaylistActions.clearCreatePlaylistState());
  }
}
