import {Component, OnInit} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import * as ProfileActions from '../../../../ngrx/actions/profile.actions'
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {VideoModel} from '../../../../models/video.model';
import {ProfileService} from '../../../../services/profile/profile.service';
import {ProfileState} from '../../../../ngrx/states/profile.state';
import {ActivatedRoute} from '@angular/router';
import {VideoCardComponent} from '../video-card/video-card.component';
import {AsyncPipe} from '@angular/common';


@Component({
  selector: 'app-video',
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    VideoCardComponent,
    AsyncPipe
  ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent implements OnInit {
  sortValue = 'desc';
  videoList$!: Observable<VideoModel[]>;
  subscription: Subscription[] = [];

  constructor(
    private store: Store<{
      profile: ProfileState
    }>) {

    this.videoList$ = this.store.select('profile', 'userVideos');

  }

  ngOnInit() {
    this.subscription.push(
      this.videoList$.subscribe((videos: VideoModel[]) => {
        if (videos && videos.length > 0) {
          console.log(videos);
        } else {
          console.log('No videos found.');
        }
      })
    )
  }

  onSortChange(event: any) {
    const value = event.value;
    this.sortValue = value;
    this.store.dispatch(ProfileActions.SortUserVideos({sortOrder: value}));
  }

}
