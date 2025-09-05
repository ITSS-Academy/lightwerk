import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {VideoCardComponent} from '../video-card/video-card.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {PlaylistDialogComponent} from '../playlist-dialog/playlist-dialog.component';
import {PlaylistCardComponent} from '../playlist-card/playlist-card.component';
import {
  MakePublicDialogComponent
} from '../../../playlist-detail/components/make-public-dialog/make-public-dialog.component';
import {Observable, Subscription} from 'rxjs';
import {PlaylistState} from '../../../../ngrx/states/playlist.state';
import {Store} from '@ngrx/store';
import {PlaylistModel} from '../../../../models/playlist.model';
import {map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import * as PlayListAction from '../../../../ngrx/actions/playlist.actions';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-playlist',
  imports: [
    MatButton,
    MatIcon,
    PlaylistCardComponent,
    AsyncPipe,

  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})

export class PlaylistComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isPlayList$!: Observable<PlaylistModel[]>

  constructor(private store: Store<{
                playlist: PlaylistState,
              }>, private activatedRoute: ActivatedRoute
  ) {
    this.isPlayList$ = this.store.select(state => state.playlist.playlists)
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(state => state.playlist.playlists).subscribe(playlistState => {
        console.log(playlistState)
      })
    );
    const profileID = this.activatedRoute.snapshot.paramMap.get('profileId');
    this.store.dispatch(PlayListAction.loadAllPlaylists({profileID: profileID!}));

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  readonly dialog = inject(MatDialog);
  name!: string;
  isPrivate: boolean = false;

  openDialog(): void {
    const dialogRef = this.dialog.open(PlaylistDialogComponent, {
      width: '700px',
      height: '400px',
      data: {name: this.name, isPrivate: this.isPrivate},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        if (result.name != undefined) {
          this.name = result.name;
        }
        if (result.isPrivate != undefined) {
          this.isPrivate = result.isPrivate;
        }

      }
    })
  }

  openPrivacyDialog(): void {
    const dialogRef = this.dialog.open(MakePublicDialogComponent, {
      width: '400px',
      data: {isPrivate: this.isPrivate}
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      this.isPrivate = result;
    });
  }

}
