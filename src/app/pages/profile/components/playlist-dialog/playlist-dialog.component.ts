import {Component} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-playlist-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatButton,
    MatInput
  ],
  templateUrl: './playlist-dialog.component.html',
  styleUrl: './playlist-dialog.component.scss'
})
export class PlaylistDialogComponent {

}
