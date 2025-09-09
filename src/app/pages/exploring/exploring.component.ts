import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, fromEvent, Subscription, BehaviorSubject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import * as VideoActions from '../../ngrx/actions/video.actions';
import * as CategoryActions from '../../ngrx/actions/category.actions';
import { VideoState } from '../../ngrx/states/video.state';
import { CategoryState } from '../../ngrx/states/category.state';
import { VideoModel } from '../../models/video.model';
import { MatChipsModule } from '@angular/material/chips';
import { ThumbnailListComponent } from '../../components/thumbnail-list/thumbnail-list.component';

@Component({
  selector: 'app-exploring',
  standalone: true,
  imports: [CommonModule, MatChipsModule, ThumbnailListComponent],
  templateUrl: './exploring.component.html',
  styleUrl: './exploring.component.scss'
})
export class ExploringComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  selectedChip: string | null = null;

  videos$!: Observable<VideoModel[]>;
  categories$!: Observable<{ id: string; name: string }[]>;
  isLoading$!: Observable<boolean>;

  page = 1;
  private scrollSub!: Subscription;
  private selectedChip$ = new BehaviorSubject<string | null>(null);

  constructor(private store: Store<{ video: VideoState; category: CategoryState }>) {
    this.videos$ = this.store.select(state => state.video.latestVideos);
    this.isLoading$ = this.store.select(state => state.video.isGettingLatest);
    this.categories$ = this.store.select(state => state.category.categories);
  }

  ngOnInit(): void {
    this.store.dispatch(CategoryActions.getAllCategories());
    this.loadVideos();
  }

  ngAfterViewInit(): void {
    this.scrollSub = fromEvent(this.scrollContainer.nativeElement, 'scroll')
      .pipe(throttleTime(200))
      .subscribe(() => {
        const el = this.scrollContainer.nativeElement;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
          this.loadMore();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.scrollSub) this.scrollSub.unsubscribe();
    this.store.dispatch(VideoActions.clearVideoState());
  }

  toggleChip(chip: string | null) {
    this.selectedChip = this.selectedChip === chip ? null : chip;
    this.selectedChip$.next(this.selectedChip);

    this.page = 1; // reset lại khi đổi category
    this.store.dispatch(VideoActions.clearVideoState());
    this.loadVideos();
  }

  loadVideos(): void {
    if (this.selectedChip) {
      this.store.dispatch(VideoActions.getVideosByCategory({
        categoryId: this.selectedChip,
        page: this.page
      }));
    } else {
      this.store.dispatch(VideoActions.getLatestVideos({ page: this.page }));
    }
  }

  loadMore(): void {
    this.page++;
    this.loadVideos();
  }
}
