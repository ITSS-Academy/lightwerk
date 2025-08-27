import {Component} from '@angular/core';
import {VideoCardComponent} from "../video-card/video-card.component";
import {LikedVideoCardComponent} from '../liked-video-card/liked-video-card.component';

interface LikedVideoCard {
  id: string;
  title: string;
  image: string;
  date: Date;
}

@Component({
  selector: 'app-liked-videos',
  imports: [
    LikedVideoCardComponent
  ],
  templateUrl: './liked-videos.component.html',
  styleUrl: './liked-videos.component.scss'
})
export class LikedVideosComponent {
  LikedVideoList: LikedVideoCard[] = [
    {
      id: "1",
      title: "Chinese Tones",
      image: "https://blog-cdn.italki.com/wp-content/uploads/sites/2/2022/09/30084900/chinese-tones.jpg",
      date: new Date(),
    },
    {
      id: "2",
      title: "Chinese Characters Origin",
      image: "https://openbooks.lib.msu.edu/app/uploads/sites/66/2021/06/character-strokes.jpg",
      date: new Date(),
    },
    {
      id: "3",
      title: "Chinese Grammar (part 1)",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy1oMNizUhInauwSnVB6IYg70Wyr9Bxjwvwg&s",
      date: new Date(),
    },
    {
      id: "4",
      title: "Respecting the elders in China",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxUGk2gZmRDLNy4Alh8H25L5-Y8d2Maw-53g&s",
      date: new Date(),
    },

  ];

}
