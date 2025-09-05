import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatRow,
  MatTable,
  MatTableModule
} from '@angular/material/table';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Playlist {
  id: number;
  thumbnail: string;
  title: string;
  user: string;
  desc: string;
}

export const PLAYLIST_DATA: Playlist[] = [
  {
    id: 1,
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/500px-Altja_j%C3%B5gi_Lahemaal.jpg',
    title: 'Video 1',
    user: 'User 1',
    desc: 'Description 1'
  },
  {
    id: 2,
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/500px-Altja_j%C3%B5gi_Lahemaal.jpg',
    title: 'Video 2',
    user: 'User 2',
    desc: 'Description 2'
  },
  {
    id: 3,
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/500px-Altja_j%C3%B5gi_Lahemaal.jpg',
    title: 'Video 3',
    user: 'User 3',
    desc: 'Description 3'
  },
];

@Component({
  selector: 'app-playlist-table',
  imports: [
    MatTableModule,
    MatTable,
    CdkDropList,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatRow,
    CdkDrag,
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
  ],
  templateUrl: './playlist-table.component.html',
  styleUrl: './playlist-table.component.scss',
  standalone: true
})
export class PlaylistTableComponent {
  private _snackBar = inject(MatSnackBar);

  openSnackBar() {
    this._snackBar.open('Video added to watch later', 'Close', {
      duration: 2000,
    });
  }

  deleteVideo(id: number) {
    this.dataSource = this.dataSource.filter(video => video.id !== id);
    this._snackBar.open('Video deleted', 'Close', {
      duration: 2000,
    });
    this.table?.renderRows();

  }

  @ViewChild('table', {static: true}) table: MatTable<Playlist> | undefined;
  displayedColumns: string[] = ['position'];
  dataSource = PLAYLIST_DATA;

  drop(event: CdkDragDrop<string>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table?.renderRows();
  }
}
