import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {VideoService} from '../../services/video/video.service';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {VideoState} from '../../ngrx/states/video.state';
import {clearVideoState, uploadVideo} from '../../ngrx/actions/video.actions';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {VideoModel} from '../../models/video.model';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-create-video',
  imports: [
    MatIconModule,
    MatSnackBarModule,
    MatButton,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './create-video.component.html',
  styleUrl: './create-video.component.scss'
})
export class CreateVideoComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isCreating$: Observable<boolean>
  isCreateSuccess$: Observable<boolean>
  video$: Observable<VideoModel>
  id!: string

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<{
      video: VideoState
    }>,
    private router: Router,
  ) {
    this.isCreating$ = this.store.select(state => state.video.isCreating)
    this.isCreateSuccess$ = this.store.select(state => state.video.isCreateSuccess)
    this.video$ = this.store.select(state => state.video.videoDetail)
  }

  ngOnInit() {
    this.subscriptions.push(
      this.video$.subscribe(video => {
        if (video.id) {
          this.id = video.id;
        }
      }),
      this.isCreateSuccess$.subscribe(success => {
        if (success) {
          this.snackBar.open('Video uploaded successfully!', 'Close', {duration: 3000});
          this.router.navigate([`upload-detail/${this.id}`]).then(() => {
          })
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.store.dispatch(clearVideoState())
  }


  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type === 'video/mp4' || file.name.toLowerCase().endsWith('.mp4')) {
        console.log('Selected file:', file);
        // Further logic for valid mp4 file
        this.store.dispatch(uploadVideo({file: file}))
      } else {
        this.snackBar.open('Please select a valid mp4 file.', 'Close', {duration: 3000});
        input.value = '';
      }
    }
  }
}
