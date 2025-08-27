import { Component } from '@angular/core';
import {MatChipListbox, MatChipOption} from '@angular/material/chips';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';

@Component({
  selector: 'app-exploring',
  imports: [
    MatChipListbox,
    MatChipOption,
    MatCard,
    MatCardImage,
    MatCardContent
  ],
  templateUrl: './exploring.component.html',
  styleUrl: './exploring.component.scss'
})
export class ExploringComponent {

}
