import {Component} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-search',
  imports: [
  
    FormsModule,

    RouterOutlet,

  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {


}
