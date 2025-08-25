import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {VideoCardComponent} from '../video-card/video-card.component';

@Component({
  selector: 'app-video',
  imports: [
    MatTabGroup,
    MatTab,
    VideoCardComponent
  ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {

}
