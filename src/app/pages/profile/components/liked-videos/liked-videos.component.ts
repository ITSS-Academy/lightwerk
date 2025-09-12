import {Component, Input, OnInit} from '@angular/core';
import {VideoCardComponent} from "../video-card/video-card.component";
import {LikedVideoCardComponent} from '../liked-video-card/liked-video-card.component';
import {Observable, Subscription} from 'rxjs';
import {VideoModel} from '../../../../models/video.model';
import {Store} from '@ngrx/store';
import {ProfileState} from '../../../../ngrx/states/profile.state';
import {AsyncPipe} from '@angular/common';
import {AvatarPipe} from '../../../../utils/avatar.pipe';

interface LikedVideoCard {
  id: string;
  title: string;
  image: string;
  date: Date;
}

@Component({
  selector: 'app-liked-videos',
  imports: [
    LikedVideoCardComponent,
    AsyncPipe,
  ],
  templateUrl: './liked-videos.component.html',
  styleUrl: './liked-videos.component.scss'
})
export class LikedVideosComponent implements OnInit {
  @Input() profileId!: string;
  likedVideoList$ !: Observable<VideoModel[]>;
  subscription: Subscription[] = [];


  constructor(
    private store: Store<{
      profile: ProfileState
    }>) {
    this.likedVideoList$ = this.store.select(state => state.profile.likedVideos);
  }

  ngOnInit() {
    this.subscription.push(
      this.likedVideoList$.subscribe((videos: VideoModel[]) => {
        if (videos && videos.length > 0) {
          console.log(videos);
        } else {
          console.log('No liked videos found.');
        }
      })
    )
  }


}
