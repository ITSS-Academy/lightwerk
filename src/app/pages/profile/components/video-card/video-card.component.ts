import {Component, inject, Input, signal} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {DatePipe} from '@angular/common';
import {VideoModel} from '../../../../models/video.model';
import {convertToSupabaseUrl} from '../../../../utils/img-converter';
import {MatDialog} from '@angular/material/dialog';
import {DetailDialogComponent} from '../../../../components/detail-dialog/detail-dialog.component';


@Component({
  selector: 'app-video-card',
  imports: [
    MatCard,
    MatCardContent,
    DatePipe
  ],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss'
})
export class VideoCardComponent {
  @Input() video!: VideoModel;
  readonly dialog = inject(MatDialog);

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;

  openDialog() {
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100%',
      maxHeight: '100vh',
      panelClass: 'full-screen-dialog',
      data: {video: this.video}
    });
    console.log('Dialog opened');

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
