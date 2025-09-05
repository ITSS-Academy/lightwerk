import {Component, inject, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {DeleteVideoDialogComponent} from '../delete-video-dialog/delete-video-dialog.component';

interface VideoCard {
  id: string;
  title: string;
  image: string;
  date: Date;
}

@Component({
  selector: 'app-video-card',
  imports: [
    DatePipe,
    MatCard,
    MatCardContent,
    MatCardImage,
    MatIcon
  ],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss'
})
export class VideoCardComponent {
 @Input() video!: VideoCard;

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef= this.dialog.open(DeleteVideoDialogComponent, {
      width: '400px',
      height: '150px',
      data: {videoId: this.video.id}
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
