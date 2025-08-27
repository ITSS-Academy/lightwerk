import {Component} from '@angular/core';
import {MatDialogContent} from '@angular/material/dialog';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatButton} from '@angular/material/button';


interface UserModel {
  id: string;
  username: string;
  imageUrl: string;
}

@Component({
  selector: 'app-follow-dialog',
  imports: [
    MatDialogContent,
    MatTabGroup,
    MatTab,
    MatButton
  ],
  templateUrl: './follow-dialog.component.html',
  styleUrl: './follow-dialog.component.scss'
})
export class FollowDialogComponent {
  Users: UserModel[] = [
    {
      id: "1",
      username: "User_1",
      imageUrl: " "
    },
    {
      id: "2",
      username: "User_2",
      imageUrl: " "
    },
    {
      id: "3",
      username: "User_3",
      imageUrl: " "
    },
    {
      id: "4",
      username: "User_4",
      imageUrl: " "
    },
    {
      id: "5",
      username: "User_5",
      imageUrl: " "
    },
  ]

}
