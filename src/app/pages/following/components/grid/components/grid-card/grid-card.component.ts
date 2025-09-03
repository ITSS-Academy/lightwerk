import {Component, inject, Input} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatDialog} from '@angular/material/dialog';
import {DetailDialogComponent} from '../../../../../../components/detail-dialog/detail-dialog.component';

@Component({
  selector: 'app-grid-card',
  imports: [
    MatCard,
    MatCardContent
  ],
  templateUrl: './grid-card.component.html',
  styleUrl: './grid-card.component.scss'
})
export class GridCardComponent {
  @Input() video!: {
    id: number;
    name: string;
    title: string;
    thumbnail: string;
    favourite: number;
    uploadDate: string;
  }
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100%',
      maxHeight: '100vh',
      panelClass: 'full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
