import {AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {DetailDialogComponent} from '../../../../components/detail-dialog/detail-dialog.component';
import {GridCardComponent} from './components/grid-card/grid-card.component';
import {VideoModel} from '../../../../models/video.model';
import {ThumbnailListComponent} from '../../../../components/thumbnail-list/thumbnail-list.component';
import {combineLatest, combineLatestAll, fromEvent, Observable, Subscription, take} from 'rxjs';
import {Store} from '@ngrx/store';
import {FollowingState} from '../../../../ngrx/states/following.state';
import {throttleTime} from 'rxjs/operators';
import * as FollowingActions from '../../../../ngrx/actions/following.actions';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-grid',
  imports: [
    MatIconModule,
    ThumbnailListComponent,
    AsyncPipe,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  readonly dialog = inject(MatDialog);

  followingVideos$: Observable<VideoModel[]>;
  isLoading$: Observable<boolean>;
  isLoadMore$: Observable<boolean>;

  private scrollSub?: Subscription;
  private resizeSub?: Subscription;

  constructor(private store: Store<{ following: FollowingState }>) {
    this.followingVideos$ = this.store.select(state => state.following.videos);
    this.isLoading$ = this.store.select(state => state.following.isGettingVideosFollowedChannels).pipe(take(2));
    this.isLoadMore$ = this.store.select(state => state.following.isGettingVideosFollowedChannels);

  }

  ngOnInit(): void {
    this.loadVideos();
  }

  ngAfterViewInit(): void {
    this.setupInfiniteScroll();
  }

  ngOnDestroy(): void {
    this.scrollSub?.unsubscribe();
    this.resizeSub?.unsubscribe();
  }

  // --- dialogs ---
  openDialog(video: VideoModel) {
    this.dialog.open(DetailDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100%',
      maxHeight: '100vh',
      panelClass: 'full-screen-dialog',
      data: {video}
    });
  }

  // --- infinite scroll ---
  private loadVideos(): void {
    this.followingVideos$.pipe(
      take(1)
    ).subscribe(videos => {
      this.store.dispatch(FollowingActions.getVideosFollowedChannels({page: Math.floor(videos.length / 10)}));
    })

  }

  private loadMore(): void {
    combineLatest([
      this.isLoadMore$,
      this.store.select(state => state.following.canLoadMore)
    ]).pipe(
      take(1)
    ).subscribe(([isLoadMore, canLoadMore]) => {
      if (!isLoadMore && canLoadMore) {
        this.loadVideos();
      }
    });
  }

  private checkScroll(): void {
    if (!this.scrollContainer) return;
    const el = this.scrollContainer.nativeElement;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 100;
    if (atBottom) {
      this.loadMore();
    }
  }

  private ensureFillViewport(): void {
    if (!this.scrollContainer) return;
    const el = this.scrollContainer.nativeElement;
    console.log('Ensure fill check', el.scrollHeight, el.clientHeight);
    if (el.scrollHeight <= el.clientHeight) {
      console.log('Load more to fill viewport');
      this.loadMore();
      setTimeout(() => this.ensureFillViewport(), 300);
    }
  }

  private setupInfiniteScroll(): void {
    if (!this.scrollContainer) return;

    this.scrollSub = fromEvent(this.scrollContainer.nativeElement, 'scroll')
      .pipe(throttleTime(200))
      .subscribe(() => this.checkScroll());

    this.resizeSub = fromEvent(window, 'resize')
      .pipe(throttleTime(300))
      .subscribe(() => this.ensureFillViewport());

    setTimeout(() => this.ensureFillViewport(), 0);
  }
}

