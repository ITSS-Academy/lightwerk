import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import { VideoModel } from '../../../../models/video.model';
import {convertToSupabaseUrl} from '../../../../utils/img-converter';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Store} from '@ngrx/store';
import {HistoryState} from '../../../../ngrx/states/history.state';
import * as HistoryActions from '../../../../ngrx/actions/history.actions';
import {Subscription} from 'rxjs';
import {DetailDialogComponent} from '../../../../components/detail-dialog/detail-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {
  DeleteVideoDialogComponent
} from '../../../playlist-detail/components/delete-video-dialog/delete-video-dialog.component';

@Component({
  selector: 'app-exploring-card',
  standalone: true,
  templateUrl: './exploringcard.component.html',
  imports: [
    DatePipe,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./exploringcard.component.scss']
})
export class ExploringCardComponent implements OnInit, OnDestroy{

  readonly dialog = inject(MatDialog);
  @Input() video!: VideoModel; // chỉ dùng VideoModel
  isHistoryPage = false;
  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;
  subscription: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private store: Store<{
    history: HistoryState
  }>) {
    this.activatedRoute.url.subscribe(urlSegments => {
      this.isHistoryPage = urlSegments.some(segment => segment.path === 'history');
    });
  }

  ngOnInit() {
    // Giữ nguyên subscription log data
    this.subscription.push(
      this.store.select(state => state.history.deleteSuccess).subscribe(data => {
        if (data) {
          this.store.dispatch(HistoryActions.getAllHistory());
        }
      })
    );
  }
  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  removeFromHistory(id: string) {
    this.store.dispatch(HistoryActions.deleteHistoryVideo({videoId:id}));
  }


  openDialog(video: VideoModel) {
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100%',
      maxHeight: '100vh',
      panelClass: 'full-screen-dialog',
      data: {video: video}
    });
    console.log('Dialog opened');

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

