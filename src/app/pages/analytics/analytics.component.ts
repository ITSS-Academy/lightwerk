import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, merge, Observable, startWith, switchMap, of as observableOf, map, from} from 'rxjs';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/states/auth.state';
import {VideoModel} from '../../models/video.model';
import {MatIconModule} from '@angular/material/icon';
import supabase from '../../utils/supabase';
import {convertToSupabaseUrl} from '../../utils/img-converter';
import {StatusPipe} from '../../utils/status.pipe';

@Component({
  selector: 'app-analytics',
  imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, MatIconModule, DecimalPipe, StatusPipe],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements AfterViewInit {
  private _httpClient = inject(HttpClient);

  displayedColumns: string[] = [
    'title',
    'description',
    'categoryId',
    'thumbnailPath',
    'duration',
    'viewCount',
    'status',
    'createdAt',
    'isPublic',
  ];
  exampleDatabase!: ExampleHttpDatabase | null;
  data: VideoModel[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<{ auth: AuthState }>) {
  }

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalCount;
          return data.videos;
        }),
      )
      .subscribe(data => (this.data = data));
  }

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;
}

export interface GithubApi {
  videos: VideoModel[];
  totalCount: number;
}


/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {

  constructor(private _httpClient: HttpClient) {

  }

  getAccessToken() {
    return from(supabase.auth.getSession())
  }


  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
    const href = `${environment.api_base_url}/video/user-videos/`;
    console.log(sort, order, page)

    return this.getAccessToken().pipe(
      switchMap((data) => {
        let headers: HttpHeaders | undefined = undefined;
        let newHref = href
        if (data.data.session && !data.error) {
          headers = new HttpHeaders({
            Authorization: `${data.data.session.access_token}`
          });
          newHref = href + data.data.session.user.id
        }

        const requestUrl = `${newHref}?sort=${sort}&orderBy=${order}&page=${page}&limit=10`;


        return this._httpClient.get<GithubApi>(requestUrl, {
          headers: headers
        });
      })
    );
  }

}
