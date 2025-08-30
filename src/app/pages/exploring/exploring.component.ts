import { Component } from '@angular/core';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-exploring',
  imports: [
    MatChipSet,
    MatChip,
    NgClass
  ],
  templateUrl: './exploring.component.html',
  styleUrl: './exploring.component.scss'
})
export class ExploringComponent {



}
