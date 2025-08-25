import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {DetailDialogComponent} from '../../../../components/detail-dialog/detail-dialog.component';

@Component({
  selector: 'app-grid',
  imports: [
    MatCardContent,
    MatCard,
    MatCardImage,
    MatIconModule,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
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
