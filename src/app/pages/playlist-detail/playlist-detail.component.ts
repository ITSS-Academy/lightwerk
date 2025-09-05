import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe, NgStyle} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {MakePublicDialogComponent} from './components/make-public-dialog/make-public-dialog.component';
import {DeletePlaylistDialogComponent} from './components/delete-playlist-dialog/delete-playlist-dialog.component';
import {ChangeNameDialogComponent} from './components/change-name-dialog/change-name-dialog.component';
import {VideoCardComponent} from './components/video-card/video-card.component';
import {PlaylistModel} from '../../models/playlist.model';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {PlaylistState} from '../../ngrx/states/playlist.state';
import {filter} from 'rxjs/operators';
import * as PlaylistActions from '../../ngrx/actions/playlist.actions';
import {convertToSupabaseUrl} from '../../utils/img-converter';

@Component({
  selector: 'app-playlist-detail',
  imports: [
    MatButton,
    NgStyle,
    VideoCardComponent,
    AsyncPipe,
  ],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss'
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  playListDetail$!: Observable<PlaylistModel>;
  playlistDetail!: PlaylistModel;
  playlistId!: string;
  subscriptions: Subscription[] = [];
  readonly dialog = inject(MatDialog);
  isLoading$!: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ playlist: PlaylistState }>
  ) {
    this.isLoading$ = this.store.select(state => state.playlist.isLoadingPlaylistDetails);
    this.playlistId = this.activatedRoute.snapshot.params['playlistId'];
    this.playListDetail$ = this.store.select(state => state.playlist.playListDetail)
  }

  ngOnInit() {
    this.store.dispatch(PlaylistActions.loadPlaylistDetails({playlistID: this.playlistId}));


    this.subscriptions.push(
      this.playListDetail$.subscribe((details: PlaylistModel) => {
        console.log(details);
        if (details.id) {
          this.playlistDetail = details;
          console.log(details);
        }
      })
    );
  }

  get backgroundImageStyle() {
    if (!this.playlistDetail?.thumbnailPath) return {};
    return {
      backgroundImage: `url(${convertToSupabaseUrl(this.playlistDetail.thumbnailPath, 'thumbnail')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  openDialogmakePublic() {
    if (!this.playlistDetail) return;
    this.dialog.open(MakePublicDialogComponent, {
      width: '400px',
      height: '150px',
      data: {playlistId: this.playlistDetail.id}
    });
  }

  openDialogDeletePlaylist() {
    if (!this.playlistDetail) return;
    this.dialog.open(DeletePlaylistDialogComponent, {
      width: '400px',
      height: '200px',
      data: {playlistId: this.playlistDetail.id}
    });
  }

  openDialogChangeName() {
    if (!this.playlistDetail) return;
    this.dialog.open(ChangeNameDialogComponent, {
      width: '400px',
      height: '250px',
      data: {playlistId: this.playlistDetail.id, currentName: this.playlistDetail.title}
    });
  }

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;
}
