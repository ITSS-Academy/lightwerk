import {Component} from '@angular/core';
import {MatButtonModule,} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-following',
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss'
})
export class FollowingComponent {

}
