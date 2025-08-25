import {Component} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCard, MatCardAvatar, MatCardHeader, MatCardTitleGroup} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormField, MatHint, MatInput, MatLabel, MatSuffix} from '@angular/material/input';

@Component({
  selector: 'app-detail-dialog',
  imports: [MatDialogModule, MatButton, MatCard, MatCardAvatar, MatCardHeader, MatCardTitleGroup, MatIconModule, MatFormField, MatFormField, MatInput, MatSuffix, MatFormField, MatLabel, MatHint, MatIconButton],
  templateUrl: './detail-dialog.component.html',
  styleUrl: './detail-dialog.component.scss'
})
export class DetailDialogComponent {
  isFavoriteActive = false
  isSavetagActive = false
  isFollowing = false

  constructor(private dialogRef: MatDialogRef<DetailDialogComponent>) {
  }

  comment = [
    {
      id: 1,
      name: "Mạnh Mèo",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 28, 2022"
    },
    {
      id: 2,
      name: "Anh Bi",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      date: "July 28, 2022"
    },
    {
      id: 3,
      name: "Bé My",
      avatar: "https://i.pravatar.cc/40?img=3",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 29, 2022"
    },
    {
      id: 4,
      name: "Chị Đen",
      avatar: "https://i.pravatar.cc/40?img=4",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 30, 2022"
    },
    {
      id: 5,
      name: "Anh Lu Lu",
      avatar: "https://i.pravatar.cc/40?img=5",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 28, 2022"
    },
    {
      id: 6,
      name: "Mạnh Mèo",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 28, 2022"
    },
    {
      id: 7,
      name: "Anh Bi",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      date: "July 28, 2022"
    },
    {
      id: 8,
      name: "Bé My",
      avatar: "https://i.pravatar.cc/40?img=3",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 29, 2022"
    },
    {
      id: 9,
      name: "Chị Đen",
      avatar: "https://i.pravatar.cc/40?img=4",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 30, 2022"
    },
    {
      id: 10,
      name: "Anh Lu Lu",
      avatar: "https://i.pravatar.cc/40?img=5",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 28, 2022"
    }
  ];

  closeDialog() {
    this.dialogRef.close(); // Đóng dialog
  }

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
  }

}
