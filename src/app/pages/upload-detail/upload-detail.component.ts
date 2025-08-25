import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-upload-detail',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './upload-detail.component.html',
  styleUrl: './upload-detail.component.scss'
})
export class UploadDetailComponent {

}
