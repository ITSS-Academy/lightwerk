import {Component, inject, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {VideoModel} from '../../../../models/video.model';
import {convertToSupabaseUrl} from '../../../../utils/img-converter';
import {MatDialog} from '@angular/material/dialog';
import {DetailDialogComponent} from '../../../../components/detail-dialog/detail-dialog.component';


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
  @Input() likedVideoCard!: VideoModel;
  readonly dialog = inject(MatDialog);

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;

  openDialog() {
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100%',
      maxHeight: '100vh',
      panelClass: 'full-screen-dialog',
      data: {video: this.likedVideoCard}
    });
    console.log('Dialog opened');

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
