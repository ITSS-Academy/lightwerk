import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {DetailDialogComponent} from '../../../../components/detail-dialog/detail-dialog.component';
import {GridCardComponent} from './components/grid-card/grid-card.component';
import {VideoModel} from '../../../../models/video.model';

@Component({
  selector: 'app-grid',
  imports: [
    MatCardContent,
    MatCard,
    MatCardImage,
    MatIconModule,
    GridCardComponent,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  readonly dialog = inject(MatDialog);

  openDialog(video: VideoModel) {
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100%',
      maxHeight: '100vh',
      panelClass: 'full-screen-dialog',
      data: {video: video}
    });
    console.log('Dialog opened');

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  videoList: VideoModel[] = [
    {
      id: '00b68314-4972-471e-aae9-4b977c18f45c',
      profileId: "",
      title: "Video 1",
      description: 'This is the first video',
      categoryId: null,
      thumbnailPath: "",
      aspectRatio: "",
      width: "",
      height: "",
      duration: 0,
      viewCount: 0,
      isPublic: false,
      status: "editing",
      createdAt: ""
    },

  ]
}
