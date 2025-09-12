import {Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from '@ngrx/store';
import {Observable, fromEvent, Subscription, BehaviorSubject, take} from 'rxjs';
import {throttleTime} from 'rxjs/operators';

import * as VideoActions from '../../ngrx/actions/video.actions';
import * as CategoryActions from '../../ngrx/actions/category.actions';
import {VideoState} from '../../ngrx/states/video.state';
import {CategoryState} from '../../ngrx/states/category.state';
import {VideoModel} from '../../models/video.model';
import {MatChipsModule} from '@angular/material/chips';
import {ThumbnailListComponent} from '../../components/thumbnail-list/thumbnail-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-exploring',
  standalone: true,
  imports: [CommonModule, MatChipsModule, ThumbnailListComponent, MatProgressSpinnerModule],
  templateUrl: './exploring.component.html',
  styleUrl: './exploring.component.scss'
})
export class ExploringComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  selectedChip: string | null = null;

  videos$!: Observable<VideoModel[]>;
  categories$!: Observable<{ id: string; name: string }[]>;
  isLoading$!: Observable<boolean>;
  isLoadMore$!: Observable<boolean>;

  page = 1;
  private scrollSub!: Subscription;
  private resizeSub!: Subscription;
  private selectedChip$ = new BehaviorSubject<string | null>(null);

  constructor(private store: Store<{ video: VideoState; category: CategoryState }>) {
    this.videos$ = this.store.select(state => state.video.latestVideos);
    this.isLoading$ = this.store.select(state => state.video.isGettingLatest).pipe(
      take(2)
    );
    this.isLoadMore$ = this.store.select(state => state.video.isGettingLatest);
    this.categories$ = this.store.select(state => state.category.categories);
  }

  ngOnInit(): void {
    this.store.dispatch(CategoryActions.getAllCategories());
    this.loadVideos();
  }

  ngAfterViewInit(): void {

    this.scrollSub = fromEvent(this.scrollContainer.nativeElement, 'scroll')
      .pipe(throttleTime(200))
      .subscribe(() => this.checkScroll());


    this.resizeSub = fromEvent(window, 'resize')
      .pipe(throttleTime(300))
      .subscribe(() => this.ensureFillViewport());


    setTimeout(() => this.ensureFillViewport(), 0);
  }

  ngOnDestroy(): void {
    if (this.scrollSub) this.scrollSub.unsubscribe();
    if (this.resizeSub) this.resizeSub.unsubscribe();
    this.store.dispatch(VideoActions.clearVideoState());
  }

  toggleChip(chip: string | null) {
    this.selectedChip = this.selectedChip === chip ? null : chip;
    this.selectedChip$.next(this.selectedChip);

    this.page = 1;
    this.store.dispatch(VideoActions.clearVideoState());

    // reset scroll về đầu
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = 0;
    }

    this.loadVideos();
  }

  loadVideos(): void {
    if (this.selectedChip) {
      this.store.dispatch(VideoActions.getVideosByCategory({
        categoryId: this.selectedChip,
        page: this.page
      }));
    } else {
      this.store.dispatch(VideoActions.getLatestVideos({page: this.page}));
    }
  }

  loadMore(): void {
    this.page++;
    this.loadVideos();
  }

  private checkScroll() {
    const el = this.scrollContainer.nativeElement;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 100;

    if (atBottom) {
      this.loadMore();
    }
  }

  private ensureFillViewport() {
    const el = this.scrollContainer.nativeElement;


    if (el.scrollHeight <= el.clientHeight) {
      this.loadMore();


      setTimeout(() => this.ensureFillViewport(), 300);
    }
  }
}
