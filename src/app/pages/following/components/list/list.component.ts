import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {VideoComponent} from '../../../../components/video/video.component';
import {convertToSupabaseUrl} from '../../../../utils/img-converter';
import {AsyncPipe, NgStyle} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {VideoModel} from '../../../../models/video.model';
import {Store} from '@ngrx/store';
import {VideoState} from '../../../../ngrx/states/video.state';
import * as VideoActions from '../../../../ngrx/actions/video.actions';
import {VideoListComponent} from '../../../../components/video-list/video-list.component';
import {FollowingState} from '../../../../ngrx/states/following.state';
import * as FollowingActions from '../../../../ngrx/actions/following.actions';

@Component({
  selector: 'app-list',
  imports: [
    MatIconModule,
    VideoListComponent,
    AsyncPipe,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, OnDestroy {
  isGettingVideosFollowedFirst$: Observable<boolean>
  isGettingMore: boolean = false
  canLoadMore: boolean = true
  subscriptions: Subscription[] = []
  cards!: VideoModel[]


  constructor(private store: Store<{
    video: VideoState,
    following: FollowingState
  }>) {
    this.isGettingVideosFollowedFirst$ = this.store.select(state => state.following.isGettingFirst)

  }

  getMoreVideos() {
    console.log('get more videos')
    console.log(this.canLoadMore, this.isGettingMore)
    if (this.canLoadMore && !this.isGettingMore) {
      this.store.dispatch(FollowingActions.getVideosFollowedChannels({
        page: Math.floor(this.cards.length / 10)
      }))
    }
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(state => state.following.videos).subscribe(videos => {
        console.log(videos)
        this.cards = videos
      }),
      this.store.select(state => state.following.canLoadMore).subscribe(canLoadMore => {
        this.canLoadMore = canLoadMore
      }),
      this.store.select(state => state.following.isGettingVideosFollowedChannels).subscribe(isGettingMore => {
        this.isGettingMore = isGettingMore
      }),
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
