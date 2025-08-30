import {Component} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

interface VideoModel {
  id: string;
  title: string;
  username: string;
  avatar: string;
  date: Date;
  imageUrl: string;
}

@Component({
  selector: 'app-search-page',
  imports: [
    DatePipe,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardImage,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  videoList: VideoModel[] = [
    {
      id: "1",
      title: "C is better than you think",
      username: "C expert",
      date: new Date(),
      avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
      imageUrl: "https://www.wifilearning.com/uploads/courses/33/1696428121_tDmgGJ9Viher3jDku2OBLEwifilearning33.jpg",
    },
    {
      id: "2",
      title: "This cat is so cute!!!!",
      username: "Charlotee105",
      date: new Date(),
      imageUrl: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200",
      avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    {
      id: "3",
      title: "Why the Earth is flat ?",
      username: "FacebookScienceGroup",
      date: new Date(),
      avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
      imageUrl: "https://www.gstatic.com/earth/social/00_generic_facebook-001.jpg",
    },
    {
      id: "4",
      title: "Happy 4th of July",
      username: "AmericanFather",
      date: new Date(),
      avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3gCBwHS__b0MsXYLIbs3PL5kELfhuIikgOw&s",
    },

  ]
}

