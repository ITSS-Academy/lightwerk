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
  isGettingLatestVideos$: Observable<boolean>
  subscriptions: Subscription[] = []
  cards!: VideoModel[]


  constructor(private store: Store<{
    video: VideoState
  }>) {
    this.isGettingLatestVideos$ = this.store.select(state => state.video.isGettingLatest)

    this.store.dispatch(VideoActions.getLatestVideos({
      page: 0
    }))
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(state => state.video.latestVideos).subscribe(videos => {
        console.log(videos)
        this.cards = videos
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
