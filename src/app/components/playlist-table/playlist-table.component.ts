import {Component, ViewChild} from '@angular/core';
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

export interface Playlist {
  id: number;
  thumbnail: string;
  title: string;
  user: string;
}

export const PLAYLIST_DATA: Playlist[] = [
  {
    id: 1,
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/500px-Altja_j%C3%B5gi_Lahemaal.jpg',
    title: 'Video 1',
    user: 'User 1'
  },
  {
    id: 2,
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/500px-Altja_j%C3%B5gi_Lahemaal.jpg',
    title: 'Video 2',
    user: 'User 2'
  },
  {
    id: 3,
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/500px-Altja_j%C3%B5gi_Lahemaal.jpg',
    title: 'Video 3',
    user: 'User 3'
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
  ],
  templateUrl: './playlist-table.component.html',
  styleUrl: './playlist-table.component.scss',
  standalone: true
})
export class PlaylistTableComponent {
  @ViewChild('table', {static: true}) table: MatTable<Playlist> | undefined;
  displayedColumns: string[] = ['position', 'title'];
  dataSource = PLAYLIST_DATA;

  drop(event: CdkDragDrop<string>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table?.renderRows();
  }
}
