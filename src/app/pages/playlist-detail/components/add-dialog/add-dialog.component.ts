import {Component, inject} from '@angular/core';
import {MatDialog, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatCard, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';

interface VideoModel {
  id: string;
  title: string;
  thumbnailUrl: string;
}
@Component({
  selector: 'app-add-dialog',
  imports: [
    MatIcon,
    MatButton,
    MatCheckbox,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCard,
    MatCardImage
  ],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.scss'
})
export class AddDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddDialogComponent>);
  addVideos: VideoModel[] = [
    {
      id: '1',
      title: 'The Nile River',
      thumbnailUrl: 'https://cdn.britannica.com/47/153447-050-EA01DEDF/Sand-dunes-Nile-River-Egypt.jpg?w=300'
    },
    {
      id: '2',
      title: 'Ancient Egypt',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Opening_of_the_mouth_ceremony_%28cropped%29.jpg/330px-Opening_of_the_mouth_ceremony_%28cropped%29.jpg'
    },
    {
      id: '3',
      title: 'The Sun God Ra',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Re-Horakhty.svg/250px-Re-Horakhty.svg.png'
    },
    {
      id: '4',
      title: 'Bastet: The Cat Goddess',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Bastet.svg/250px-Bastet.svg.png'
    }
  ];
  closeDialog() {
    this.dialogRef.close()
  }
}
