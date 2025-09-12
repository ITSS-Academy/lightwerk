import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogContent} from '@angular/material/dialog';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatButton} from '@angular/material/button';
import {Store} from '@ngrx/store';
import {ProfileState} from '../../../../ngrx/states/profile.state';
import {ProfileModel} from '../../../../models/profile.model';
import {Observable, Subscription, take} from 'rxjs';
import * as ProfileActions from '../../../../ngrx/actions/profile.actions';
import {AvatarPipe} from '../../../../utils/avatar.pipe';
import {AsyncPipe} from '@angular/common';
import * as SearchActions from '../../../../ngrx/actions/search.actions';


@Component({
  selector: 'app-follow-dialog',
  imports: [
    MatDialogContent,
    MatTabGroup,
    MatTab,
    MatButton,
    AvatarPipe,
    AsyncPipe
  ],
  templateUrl: './follow-dialog.component.html',
  styleUrl: './follow-dialog.component.scss'
})
export class FollowDialogComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  followersList$!: Observable<ProfileModel[]>;
  followingList$!: Observable<ProfileModel[]>;


  selectedIndex: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedTab: number },
              private store: Store<{ profile: ProfileState }>
  ) {
    this.selectedIndex = data?.selectedTab ?? 0;
    this.followersList$ = this.store.select(state => state.profile.followersList);
    this.followingList$ = this.store.select(state => state.profile.followingList);
  }

  ngOnInit() {
    this.subscription.push(
      this.followersList$.pipe(take(1)).subscribe(followers => {
        this.store.select(state => state.profile.profile)
          .pipe(take(1))
          .subscribe(profile => {
            if (profile && profile.id && (!followers || followers.length === 0)) {
              this.store.dispatch(
                ProfileActions.getFollowers({
                  profileId: profile.id,
                  page: 0,
                  orderBy: 'asc'
                })
              );
            }
          });
      }),
      this.followingList$.pipe(take(1)).subscribe(following => {
        this.store.select(state => state.profile.profile)
          .pipe(take(1))
          .subscribe(profile => {
            if (profile && profile.id && (!following || following.length === 0)) {
              this.store.dispatch(
                ProfileActions.getFollowing({
                  profileId: profile.id,
                  page: 0,
                  orderBy: 'asc'
                })
              );
            }
          });
      })
    );
  }


  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  toggleFollow(profile: ProfileModel, isFollowing: boolean) {
    if (isFollowing) {
      this.store.dispatch(ProfileActions.followUser({userId: profile.id, shouldFollow: false}));
    } else {
      this.store.dispatch(ProfileActions.followUser({userId: profile.id, shouldFollow: true}));
    }

    this.store.select(state => state.profile.profile)
      .pipe(take(1))
      .subscribe(currentProfile => {
        if (currentProfile && currentProfile.id) {
          this.store.dispatch(ProfileActions.getFollowers({
            profileId: currentProfile.id,
            page: 0,
            orderBy: 'asc'
          }));
          this.store.dispatch(ProfileActions.getFollowing({
            profileId: currentProfile.id,
            page: 0,
            orderBy: 'asc'
          }));
        }
      });
  }

}
