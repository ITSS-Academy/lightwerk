import {Component, inject, Input} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatDialog} from '@angular/material/dialog';
import {DetailDialogComponent} from '../../../../../../components/detail-dialog/detail-dialog.component';
import {VideoModel} from '../../../../../../models/video.model';
import {convertToSupabaseUrl} from '../../../../../../utils/img-converter';

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
  @Input() video!: VideoModel;

  readonly dialog = inject(MatDialog);


  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;
}
