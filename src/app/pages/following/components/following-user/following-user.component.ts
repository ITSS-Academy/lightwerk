import {Component} from '@angular/core';
import {
  MatCard, MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-following-user',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardAvatar,
    MatButton
  ],
  templateUrl: './following-user.component.html',
  styleUrl: './following-user.component.scss'

})
export class FollowingUserComponent {
  followStates = Array(50).fill(true);

  toggleFollow(index: number) {
    this.followStates[index] = !this.followStates[index];
  }
}
