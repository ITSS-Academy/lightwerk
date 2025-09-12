import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe, DatePipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {Observable, Subscription} from 'rxjs';
import {VideoModel} from '../../../../models/video.model';

import {Store} from '@ngrx/store';
import {SearchState} from '../../../../ngrx/states/search.state';
import * as SearchActions from '../../../../ngrx/actions/search.actions';
import {convertToSupabaseUrl} from '../../../../utils/img-converter';
import {AvatarPipe} from '../../../../utils/avatar.pipe';
import {DetailDialogComponent} from '../../../../components/detail-dialog/detail-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-video-page',
  imports: [
    MatIcon,
    RouterLink,
    DatePipe,
    MatCard,
    MatCardContent,
    MatCardImage,
    AsyncPipe,
    AvatarPipe
  ],
  templateUrl: './video-page.component.html',
  styleUrl: './video-page.component.scss'
})
export class VideoPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  videos$!: Observable<VideoModel[]>;
  query: string = '';
  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{
      search: SearchState
    }>,) {
    this.videos$ = this.store.select(state => state.search.isSearchingVideos);
  }


  ngOnInit() {
    this.subscriptions.push(
      this.route.queryParamMap.subscribe((params: any) => {
        const q = params.get('q');
        if (!q || q.trim() === '') {
          this.router.navigate(['/home']);
          return;
        }
        this.query = q;
        this.store.dispatch(SearchActions.searchVideos({query: q}));
      })
    );
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;

  openDialog(item: VideoModel) {
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100%',
      maxHeight: '100vh',
      panelClass: 'full-screen-dialog',
      data: {video: item}
    });
    console.log('Dialog opened');

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
