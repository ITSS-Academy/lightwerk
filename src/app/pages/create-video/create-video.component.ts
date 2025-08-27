import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-video',
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './create-video.component.html',
  styleUrl: './create-video.component.scss'
})
export class CreateVideoComponent {
  constructor(private router: Router) {
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.router.navigate(['/upload-details']);
    }
  }
}
