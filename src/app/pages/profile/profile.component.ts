import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Subscription, combineLatest, take} from 'rxjs';
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
    MatButton],
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
  profileImageUrl: string = 'data:image/png;base64,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';

  profileId: string = '';
  videoList$!: import("rxjs").Observable<import("../../models/video.model").VideoModel[]>;
  isLoading$!: import("rxjs").Observable<boolean>;
  totalCount$!: import("rxjs").Observable<number>;


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
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
    this.subscription = [];
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
