import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {VideoCardComponent} from '../video-card/video-card.component';

@Component({
    selector: 'app-playlist',
  imports: [
    MatTab,
    MatTabGroup,
    VideoCardComponent
  ],
    templateUrl: './playlist.component.html',
    styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {

}
