import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit, inject, OnInit, OnDestroy} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AsyncPipe, DatePipe, DecimalPipe, JsonPipe} from '@angular/common';
import {environment} from '../../environments/environment.development';
import {AuthState} from '../../ngrx/states/auth.state';
import {Store} from '@ngrx/store';
import {VideoModel} from '../../models/video.model';
import {MatIconModule} from '@angular/material/icon';
import {VideoComponent} from '../../components/video/video.component';
import {HistoryState} from '../../ngrx/states/history.state';
import * as HistoryActions from '../../ngrx/actions/history.actions';
import {convertToSupabaseUrl} from '../../utils/img-converter';
import {ThumbnailListComponent} from '../../components/thumbnail-list/thumbnail-list.component';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-history',
  imports: [
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ThumbnailListComponent,
    MatButtonModule,
    MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe, AsyncPipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  // Observable để bind ra HTML
  videos$!: Observable<VideoModel[]>;
  isLoading$!: Observable<boolean>;

  constructor(private store: Store<{ history: HistoryState }>) {
    this.store.dispatch(HistoryActions.getAllHistory());
  }

  ngOnInit() {
    // Giữ nguyên subscription log data
    this.subscription.push(
      this.store.select(state => state.history.historyVideos).subscribe(data => {
        console.log(data.map(d => d.video));
      })
    );

    // Thêm Observable để binding ra thumbnail
    this.videos$ = this.store.select(state => state.history.historyVideos).pipe(
      map(historyVideos => historyVideos.map(h => h.video))
    );
// isLoading$ nếu có trong store, mặc định false nếu chưa có
    this.isLoading$ = this.store.select(state => state.history.isLoading || false);
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;


  onDateChange() {

  }
}
