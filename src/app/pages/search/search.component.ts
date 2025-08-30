import {Component} from '@angular/core';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {VideoCardComponent} from '../profile/components/video-card/video-card.component';

@Component({
  selector: 'app-search',
  imports: [
    MatSuffix,
    MatInput,
    MatIconButton,
    MatSuffix,
    MatFormField,
    MatLabel,
    MatIcon,
    FormsModule,
    MatButton,
    VideoCardComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

}
