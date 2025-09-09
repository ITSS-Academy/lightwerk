import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Subscription, combineLatest, take, Observable} from 'rxjs';
import {VideoComponent} from './components/video/video.component';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {LikedVideosComponent} from './components/liked-videos/liked-videos.component';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ProfileDialogComponent} from './components/profile-dialog/profile-dialog.component';
import {FollowDialogComponent} from './components/follow-dialog/follow-dialog.component';
import {Store} from '@ngrx/store';
import {ProfileState} from '../../ngrx/states/profile.state';
import * as ProfileActions from '../../ngrx/actions/profile.actions';
import {ProfileService} from '../../services/profile/profile.service';
import {ProfileModel} from '../../models/profile.model';
import {AsyncPipe} from '@angular/common';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

interface UserModel {
  id: string;
  username: string;
  imageUrl: string;
}

@Component({
  selector: 'app-profile',
  imports: [
    MatIconModule,
    MatTabsModule,
    VideoComponent,
    PlaylistComponent,
    LikedVideosComponent,
    MatButton,
    AsyncPipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  tabRoutes = ['videos', 'playlists', 'liked-videos'];
  selectedIndex = 0;
  subscription: Subscription[] = [];
  readonly dialog = inject(MatDialog);
  bio: string = 'No bio yet';
  username: string = 'Username';
  profileImageUrl: string = 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/08/anh-con-meo-cute-7.jpg';

  profileId: string = '';
  videoList$!: import("rxjs").Observable<import("../../models/video.model").VideoModel[]>;
  isLoading$!: import("rxjs").Observable<boolean>;
  totalCount$!: import("rxjs").Observable<number>;
  profile$!: Observable<ProfileModel | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ profile: ProfileState }>
  ) {
    this.subscription.push(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
        const child = this.route.firstChild;
        const path = child?.snapshot.routeConfig?.path;
        const idx = this.tabRoutes.indexOf(path || 'all');
        this.selectedIndex = idx === -1 ? 0 : idx;
      })
    );
    this.profileId = this.route.snapshot.params['profileId'];
    this.videoList$ = this.store.select('profile', 'userVideos');
    this.isLoading$ = this.store.select('profile', 'isLoading');
    this.totalCount$ = this.store.select('profile', 'totalCount');
    this.store.dispatch(ProfileActions.getUserVideos({
      profileId: this.profileId,
      orderBy: 'desc',
      page: 0
    }));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      data: {
        bio: this.bio,
        username: this.username,
        profileImageUrl: this.profileImageUrl
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.bio !== undefined) this.bio = result.bio;
        if (result.username !== undefined) this.username = result.username;
        if (result.profileImageUrl !== undefined) this.profileImageUrl = result.profileImageUrl;
      }
    });
  }


  openDialogUser(type: 'followers' | 'following') {
    const selectedTab = type === 'followers' ? 0 : 1;
    const dialogRef = this.dialog.open(FollowDialogComponent, {
      data: {selectedTab}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
      if (this.selectedIndex === 0) {
        this.loadMoreVideos();
      }
    }
  }

  loadMoreVideos() {
    combineLatest([
      this.isLoading$,
      this.store.select('profile', 'canLoadMore'),
      this.videoList$
    ]).pipe(
      take(1)
    ).subscribe(([isLoading, canLoadMore, videoList]) => {
      console.log('isLoading:', isLoading, 'canLoadMore:', canLoadMore, 'current video count:', videoList.length);
      if (!isLoading && canLoadMore) {
        // console.log(videoList.length / 10);
        this.store.dispatch(ProfileActions.getUserVideos({
          profileId: this.profileId,
          orderBy: 'desc',
          page: videoList.length / 10
        }));
      }
    });
  }

  ngOnInit() {
    this.subscription.push(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
        const child = this.route.firstChild;
        const path = child?.snapshot.routeConfig?.path;
        const idx = this.tabRoutes.indexOf(path || 'all');
        this.selectedIndex = idx === -1 ? 0 : idx;
      })
    );
    this.profileId = this.route.snapshot.params['profileId'];
    this.videoList$ = this.store.select('profile', 'userVideos');
    this.isLoading$ = this.store.select('profile', 'isLoading');
    this.totalCount$ = this.store.select('profile', 'totalCount');
    this.profile$ = this.store.select('profile', 'profile');
    this.store.dispatch(ProfileActions.getUserVideos({
      profileId: this.profileId,
      orderBy: 'desc',
      page: 0
    }));
    this.store.dispatch(ProfileActions.getProfile({userId: this.profileId}));
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
    this.subscription = [];
    this.store.dispatch(ProfileActions.clearProfileState());
  }

  onTabChange(idx: number) {
    const route = this.tabRoutes[idx];
    this.router.navigate([route], {relativeTo: this.route});
  }

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


}
