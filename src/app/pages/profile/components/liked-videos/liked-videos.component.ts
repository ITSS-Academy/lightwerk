import { Component } from '@angular/core';
import {VideoCardComponent} from "../video-card/video-card.component";

@Component({
  selector: 'app-liked-videos',
    imports: [
        VideoCardComponent
    ],
  templateUrl: './liked-videos.component.html',
  styleUrl: './liked-videos.component.scss'
})
export class LikedVideosComponent {

}
