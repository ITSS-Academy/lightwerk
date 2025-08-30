import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

interface PlayListModel {
  id: string;
  image: string;
  name: string;
  videoCount: number;
  isPrivate: boolean;
}

@Component({
  selector: 'app-playlist-card',
  imports: [
    MatCardContent,
    MatCard,
    MatCardImage,
    MatIcon,
  ],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss'
})
export class PlaylistCardComponent {
  @Input() playlist!: PlayListModel

}
