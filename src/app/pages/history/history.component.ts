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
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelect} from '@angular/material/select';

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
    MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe, AsyncPipe, MatSelect, MatSelect, MatOption
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
  }

  ngOnInit() {
    // Giữ nguyên subscription log data
    this.subscription.push(
      this.store.select(state => state.history.historyVideos).subscribe(data => {
        console.log(data.map(d => d.video));
      }),
      this.store.select(state => state.history.deleteSuccess).subscribe(data => {
        if (data) {
          switch (this.selectedOption) {
            case 'today':
            case 'yesterday':
              this.onOptionChange(this.selectedOption);
              break;
            case 'custom':
              this.onOptionChange(this.selectedOption);
              break
          }
        }
      })
    );

    this.selectedOption = 'today';
    this.onOptionChange(this.selectedOption);

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
  selectedOption: any;


  onDateChange(start: Date | null | undefined = this.range.value.start, end: Date | null | undefined = this.range.value.end) {
    if (start && end) {
      // Đặt thời gian bắt đầu vào đầu ngày và thời gian kết thúc vào cuối ngày
      const startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999);
      this.store.dispatch(HistoryActions.getAllHistory({
        startDate: startDate,
        endDate: endDate
      }));
    }

  }

  onOptionChange(value: any) {
    this.selectedOption = value;
    const now = new Date();
    console.log('Selected option:', value);
    let start: Date | null = null;
    let end: Date | null = null;
    console.log('========================', now);

    switch (value) {
      case 'today':
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        this.store.dispatch(HistoryActions.getAllHistory({
          startDate: start,
          endDate: end
        }));
        break;
      case 'yesterday':
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0, 0);
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999);
        this.store.dispatch(HistoryActions.getAllHistory({
          startDate: start,
          endDate: end
        }));
        break;
      case 'custom':
        this.onDateChange()

    }
  }
}

