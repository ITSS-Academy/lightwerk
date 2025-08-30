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
import {FollowingUserCardComponent} from './components/following-user-card/following-user-card.component';

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
    MatButton,
    FollowingUserCardComponent
  ],
  templateUrl: './following-user.component.html',
  styleUrl: './following-user.component.scss'

})
export class FollowingUserComponent {
  followStates = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/40?img=1',
      username: '@johndoe',
      isFollowing: true,
      quantityFollowed: 120
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/40?img=2',
      username: '@janesmith',
      isFollowing: false,
      quantityFollowed: 230
    },
    {
      id: 3,
      name: 'Michael Johnson',
      avatar: 'https://i.pravatar.cc/40?img=3',
      username: '@michaelj',
      isFollowing: true,
      quantityFollowed: 98
    },
    {
      id: 4,
      name: 'Emily Davis',
      avatar: 'https://i.pravatar.cc/40?img=4',
      username: '@emilyd',
      isFollowing: false,
      quantityFollowed: 310
    },
    {
      id: 5,
      name: 'Daniel Wilson',
      avatar: 'https://i.pravatar.cc/40?img=5',
      username: '@danielw',
      isFollowing: true,
      quantityFollowed: 450
    },
    {
      id: 6,
      name: 'Sophia Martinez',
      avatar: 'https://i.pravatar.cc/40?img=6',
      username: '@sophiam',
      isFollowing: false,
      quantityFollowed: 210
    },
    {
      id: 7,
      name: 'James Anderson',
      avatar: 'https://i.pravatar.cc/40?img=7',
      username: '@jamesa',
      isFollowing: true,
      quantityFollowed: 87
    },
    {
      id: 8,
      name: 'Olivia Thomas',
      avatar: 'https://i.pravatar.cc/40?img=8',
      username: '@oliviat',
      isFollowing: false,
      quantityFollowed: 275
    },
    {
      id: 9,
      name: 'William Taylor',
      avatar: 'https://i.pravatar.cc/40?img=9',
      username: '@willt',
      isFollowing: true,
      quantityFollowed: 390
    },
    {
      id: 10,
      name: 'Ava Hernandez',
      avatar: 'https://i.pravatar.cc/40?img=10',
      username: '@avah',
      isFollowing: false,
      quantityFollowed: 156
    },
    {
      id: 11,
      name: 'Alexander Moore',
      avatar: 'https://i.pravatar.cc/40?img=11',
      username: '@alexm',
      isFollowing: true,
      quantityFollowed: 199
    },
    {
      id: 12,
      name: 'Mia Clark',
      avatar: 'https://i.pravatar.cc/40?img=12',
      username: '@miac',
      isFollowing: false,
      quantityFollowed: 322
    },
    {
      id: 13,
      name: 'Benjamin Lewis',
      avatar: 'https://i.pravatar.cc/40?img=13',
      username: '@benl',
      isFollowing: true,
      quantityFollowed: 441
    },
    {
      id: 14,
      name: 'Charlotte Walker',
      avatar: 'https://i.pravatar.cc/40?img=14',
      username: '@charlottew',
      isFollowing: false,
      quantityFollowed: 145
    },
    {
      id: 15,
      name: 'Henry Hall',
      avatar: 'https://i.pravatar.cc/40?img=15',
      username: '@henryh',
      isFollowing: true,
      quantityFollowed: 287
    },
    {
      id: 16,
      name: 'Amelia Allen',
      avatar: 'https://i.pravatar.cc/40?img=16',
      username: '@ameliaa',
      isFollowing: false,
      quantityFollowed: 365
    },
    {
      id: 17,
      name: 'Lucas Young',
      avatar: 'https://i.pravatar.cc/40?img=17',
      username: '@lucasy',
      isFollowing: true,
      quantityFollowed: 212
    },
    {
      id: 18,
      name: 'Harper King',
      avatar: 'https://i.pravatar.cc/40?img=18',
      username: '@harperk',
      isFollowing: false,
      quantityFollowed: 480
    },
    {
      id: 19,
      name: 'Ethan Wright',
      avatar: 'https://i.pravatar.cc/40?img=19',
      username: '@ethanw',
      isFollowing: true,
      quantityFollowed: 92
    },
    {
      id: 20,
      name: 'Ella Scott',
      avatar: 'https://i.pravatar.cc/40?img=20',
      username: '@ellas',
      isFollowing: false,
      quantityFollowed: 332
    },
  ];

  toggleFollow(user: any) {
    user.isFollowing = !user.isFollowing;

    if (user.isFollowing) {
      user.quantityFollowed++;
    } else {
      user.quantityFollowed--;
    }
  }


}

