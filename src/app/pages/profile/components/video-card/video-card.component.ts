import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {DatePipe} from '@angular/common';
import {VideoModel} from '../../../../models/video.model';
import {convertToSupabaseUrl} from '../../../../utils/img-converter';


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

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;
}
