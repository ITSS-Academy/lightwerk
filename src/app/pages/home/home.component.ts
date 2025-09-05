import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  ChangeDetectorRef,
  OnInit, OnDestroy
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../../services/auth/auth.service';
import supabase from '../../utils/supabase';
import {MatIconModule} from '@angular/material/icon';
import {VideoComponent} from '../../components/video/video.component';
import {AsyncPipe, NgClass, NgStyle, SlicePipe} from '@angular/common';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {convertToSupabaseUrl} from '../../utils/img-converter';
import {Store} from '@ngrx/store';
import {VideoState} from '../../ngrx/states/video.state';
import * as VideoActions from '../../ngrx/actions/video.actions';
import {Observable, Subscription, take} from 'rxjs';
import {VideoModel} from '../../models/video.model';
import {filter} from 'rxjs/operators';
import {VideoListComponent} from '../../components/video-list/video-list.component';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatIconModule,
    VideoListComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  isGettingFirst: Observable<boolean>
  subscriptions: Subscription[] = []
  cards!: VideoModel[]

  canGetMoreLatest!: boolean
  isGettingLatest!: boolean

  constructor(private store: Store<{
    video: VideoState
  }>) {
    this.isGettingFirst = this.store.select(state => state.video.isGettingFirstLatest)

    this.store.dispatch(VideoActions.getLatestVideos({
      page: 0
    }))
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(state => state.video.latestVideos).subscribe(videos => {
        console.log(videos)
        this.cards = videos
      }),
      this.store.select(state => state.video.canGetMoreLatest).subscribe(canGetMore => {
        this.canGetMoreLatest = canGetMore
      }),
      this.store.select(state => state.video.isGettingLatest).subscribe(isGetting => {
        this.isGettingLatest = isGetting
      })
    )
  }

  getMoreVideos() {
    if (this.canGetMoreLatest && !this.isGettingLatest) {
      const currentPage = Math.floor(this.cards.length / 10);
      this.store.dispatch(VideoActions.getLatestVideos({
        page: currentPage
      }))
    }

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
