import {Component} from '@angular/core';
import {VideoCardComponent} from '../video-card/video-card.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-playlist',
  imports: [
    VideoCardComponent,
    MatButton,
    MatIcon,

  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {
  openDialog() {

  }
}
