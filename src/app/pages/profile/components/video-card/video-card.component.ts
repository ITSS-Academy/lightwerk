import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {DatePipe} from '@angular/common';

interface VideoModel {
  id: string;
  title: string;
  image: string;
  date: Date
}

@Component({
  selector: 'app-video-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardImage,
    DatePipe
  ],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss'
})
export class VideoCardComponent {
  @Input() video!: VideoModel;

}
