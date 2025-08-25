import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';

@Component({
  selector: 'app-video-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardImage
  ],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss'
})
export class VideoCardComponent {

}
