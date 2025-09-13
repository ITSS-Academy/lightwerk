import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {DatePipe, NgStyle} from '@angular/common';
import {PlaylistModel} from '../../../../models/playlist.model';
import {convertToSupabaseUrl} from '../../../../utils/img-converter';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {PlaylistState} from '../../../../ngrx/states/playlist.state';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-playlist-card',
  imports: [
    MatCardContent,
    MatCard,
    MatCardImage,
    MatIcon,
    DatePipe,
    NgStyle,
  ],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss'
})
export class PlaylistCardComponent {

  constructor(private router: Router,) {

  }


  @Input() playlist!: PlaylistModel

  navigateToPlaylistDetail(id: string): void {
    this.router.navigate(['/playlist', id]).then();
  }

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;
}
