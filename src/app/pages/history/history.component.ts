import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePipe, DecimalPipe} from '@angular/common';
import {environment} from '../../environments/environment.development';
import {AuthState} from '../../ngrx/states/auth.state';
import {Store} from '@ngrx/store';
import {VideoModel} from '../../models/video.model';
import {MatIconModule} from '@angular/material/icon';
import {VideoComponent} from '../../components/video/video.component';
import {PlaylistTableComponent} from '../../components/playlist-table/playlist-table.component';

@Component({
  selector: 'app-history',
  imports: [MatProgressSpinnerModule, MatIconModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, DecimalPipe, VideoComponent, PlaylistTableComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

}
