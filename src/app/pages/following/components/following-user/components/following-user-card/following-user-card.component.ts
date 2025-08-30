import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardAvatar, MatCardHeader, MatCardTitleGroup} from "@angular/material/card";

@Component({
  selector: 'app-following-user-card',
  imports: [
    MatButton,
    MatCard,
    MatCardAvatar,
    MatCardHeader,
    MatCardTitleGroup
  ],
  templateUrl: './following-user-card.component.html',
  styleUrl: './following-user-card.component.scss'
})
export class FollowingUserCardComponent {
  @Input() user!: {
    id: number;
    name: string;
    avatar: string,
    username: string,
    isFollowing: boolean,
    quantityFollowed: number,
  }

  @Input() toggleFollow!: (user: any) => void;

}

