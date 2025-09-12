import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogContent} from '@angular/material/dialog';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatButton} from '@angular/material/button';
import {Store} from '@ngrx/store';
import {ProfileState} from '../../../../ngrx/states/profile.state';
import {ProfileModel} from '../../../../models/profile.model';
import {Observable, Subscription} from 'rxjs';
import * as ProfileActions from '../../../../ngrx/actions/profile.actions';
import {AvatarPipe} from '../../../../utils/avatar.pipe';


@Component({
  selector: 'app-follow-dialog',
  imports: [
    MatDialogContent,
    MatTabGroup,
    MatTab,
    MatButton,
    AvatarPipe
  ],
  templateUrl: './follow-dialog.component.html',
  styleUrl: './follow-dialog.component.scss'
})
export class FollowDialogComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  followersList$!: Observable<ProfileModel[]>;
  followingList$!: Observable<ProfileModel[]>;

  followers: ProfileModel[] = [];
  following: ProfileModel[] = [];

  selectedIndex: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedTab: number },
              private store: Store<{ profile: ProfileState }>
  ) {
    this.selectedIndex = data?.selectedTab ?? 0;
    this.followersList$ = this.store.select(state => state.profile.followersList);
    this.followingList$ = this.store.select(state => state.profile.followingList);
  }

  ngOnInit() {
    const userId = "123";


    this.store.dispatch(ProfileActions.getFollowersList({userId}));

    this.store.dispatch(ProfileActions.getFollowingList({userId}));


    this.subscription.push(
      this.followersList$.subscribe(list => {
        this.followers = list.map(item => ({
            ...item,
            isFollowing: item.isFollowing
          }),
        )
        console.log('Followers:', this.followers);
      }),

      this.followingList$.subscribe(list => {
        this.following = list.map(item => ({
            ...item,
            isFollowing: item.isFollowing
          }),
        )
        console.log('Following:', this.following);
      })
    );
  }


  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  toggleFollow(item: ProfileModel) {
    item.isFollowing = !item.isFollowing;
  }

  get followersCount(): number {
    return this.followers.length;
  }

  get followingCount(): number {
    return this.following.length;
  }
}
