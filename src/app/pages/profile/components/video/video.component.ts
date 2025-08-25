import {Component} from '@angular/core';
import {VideoCardComponent} from '../video-card/video-card.component';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

@Component({
  selector: 'app-video',
  imports: [
    VideoCardComponent,
    MatButtonToggleGroup,
    MatButtonToggle
  ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {

}
