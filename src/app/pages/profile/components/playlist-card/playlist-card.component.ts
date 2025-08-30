import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

interface PlayListModel {
  id: string;
  image: string;
  name: string;
  videoCount: number;
  isPrivate: boolean;
  date: Date;
}

@Component({
  selector: 'app-playlist-card',
  imports: [
    MatCardContent,
    MatCard,
    MatCardImage,
    MatIcon,
    DatePipe,
  ],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss'
})
export class PlaylistCardComponent {
  constructor(private router: Router) {

  }

  @Input() playlist!: PlayListModel

  navigateToPlaylistDetail(id: string): void {
    this.router.navigate(['/playlist', id]).then();
  }

}
