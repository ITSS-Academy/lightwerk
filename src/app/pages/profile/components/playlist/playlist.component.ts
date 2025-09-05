import {Component, inject} from '@angular/core';
import {VideoCardComponent} from '../video-card/video-card.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {PlaylistDialogComponent} from '../playlist-dialog/playlist-dialog.component';
import {PlaylistCardComponent} from '../playlist-card/playlist-card.component';


interface PlayListModel {
  id: string;
  image: string;
  name: string;
  videoCount: number;
  isPrivate: boolean;
  date: Date;
}

@Component({
  selector: 'app-playlist',
  imports: [
    MatButton,
    MatIcon,
    PlaylistCardComponent,

  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})

export class PlaylistComponent {


  playlistCollection: PlayListModel[] = [
    {
      id: "1",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png",
      name: "Fun Chinese Facts",
      videoCount: 2,
      isPrivate: true,
      date: new Date()
    },

    {
      id: "2",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/HSK-logo.jpg/500px-HSK-logo.jpg",
      name: "HSK tips",
      videoCount: 3,
      isPrivate: false,
      date: new Date()
    },

    {
      id: "3",
      image: "https://www.engineer4free.com/uploads/1/0/2/9/10296972/3295580_orig.jpg",
      name: "What is a Linear Algebra ?",
      videoCount: 1,
      isPrivate: false,
      date: new Date()
    },
    {
      id: "4",
      image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781626860605/the-art-of-war-9781626860605_lg.jpg",
      name: "The Art Of War (Series)",
      videoCount: 3,
      isPrivate: false,
      date: new Date()
    }
  ];

  readonly dialog = inject(MatDialog);
  name!: string;
  isPrivate: boolean = false;

  openDialog(): void {
    const dialogRef = this.dialog.open(PlaylistDialogComponent, {
      width: '700px',
      height: '400px',
      data: {name: this.name, isPrivate: this.isPrivate},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        if (result.name != undefined) {
          this.name = result.name;
        }
        if (result.isPrivate != undefined) {
          this.isPrivate = result.isPrivate;
        }

      }
    })
  }


}



