import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {ExploringCardComponent} from "../../pages/exploring/components/exploringcard/exploringcard.component";
import {VideoModel} from '../../models/video.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-thumbnail-list',
    imports: [
        AsyncPipe,
        ExploringCardComponent
    ],
  templateUrl: './thumbnail-list.component.html',
  styleUrl: './thumbnail-list.component.scss'
})
export class ThumbnailListComponent {
  @Input() videos$!: Observable<VideoModel[]>;


}
