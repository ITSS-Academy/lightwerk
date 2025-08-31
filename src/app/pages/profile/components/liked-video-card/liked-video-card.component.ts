import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";

interface LikedVideoCard {
  id: string;
  title: string;
  image: string;
  date: Date;
}

@Component({
  selector: 'app-liked-video-card',
  imports: [
    DatePipe,
    MatCard,
    MatCardContent,
    MatCardImage
  ],
  templateUrl: './liked-video-card.component.html',
  styleUrl: './liked-video-card.component.scss'
})
export class LikedVideoCardComponent {
  @Input() likedVideoCard!: LikedVideoCard;

}
