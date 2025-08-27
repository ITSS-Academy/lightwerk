import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  followers: UserModel[] = [
    {
      id: "1",
      username: "User_1",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    {
      id: "2",
      username: "User_2",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    {
      id: "3",
      username: "User_3",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    {
      id: "4",
      username: "User_4",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    {
      id: "5",
      username: "User_5",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
  ];

  following: UserModel[] = [
    {
      id: "1",
      username: "User_1",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    {
      id: "2",
      username: "User_2",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    {
      id: "3",
      username: "User_3",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    {
      id: "4",
      username: "User_4",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    {
      id: "5",
      username: "User_5",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
  ];

  selectedIndex: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedTab: number }) {
    this.selectedIndex = data?.selectedTab ?? 0;
  }
}
