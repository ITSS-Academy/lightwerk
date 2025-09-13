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
import {AuthService} from '../../services/auth/auth.service';
import * as PlayListAction from '../../ngrx/actions/playlist.actions';
import {AvatarPipe} from '../../utils/avatar.pipe';

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
    AsyncPipe,
    AvatarPipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  tabRoutes = ['videos', 'playlists', 'liked-videos'];
  selectedIndex = 0;
  subscription: Subscription[] = [];
  readonly dialog = inject(MatDialog);

  profileId: string = '';
  videoList$!: import("rxjs").Observable<import("../../models/video.model").VideoModel[]>;
  isLoading$!: import("rxjs").Observable<boolean>;
  totalCount$!: import("rxjs").Observable<number>;
  profile$!: Observable<ProfileModel | null>;
  likedVideoList$!: Observable<import("../../models/video.model").VideoModel[]>;
  isOwnProfile: boolean = false;
  profile!: ProfileModel

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<{ profile: ProfileState }>,
    private authService: AuthService // Inject AuthService
  ) {

    this.profileId = this.activatedRoute.snapshot.params['profileId'];
    this.videoList$ = this.store.select('profile', 'userVideos');
    this.isLoading$ = this.store.select('profile', 'isLoading');
    this.totalCount$ = this.store.select('profile', 'totalCount');
    this.likedVideoList$ = this.store.select('profile', 'likedVideos');
    this.store.dispatch(ProfileActions.getUserVideos({
      profileId: this.profileId,
      orderBy: 'desc',
      page: 0
    }));
    this.store.dispatch(ProfileActions.getLikedVideos({
      profileId: this.profileId,
      orderBy: 'desc',
      page: 0
    }));
    this.store.dispatch(PlayListAction.loadAllPlaylists({profileID: this.profileId}));

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      data: {
        bio: this.profile?.bio,
        username: this.profile?.username,
        profileImageUrl: this.profile?.avatarPath
      },
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
    console.log('Scroll event:', element.scrollTop, element.clientHeight, element.scrollHeight);
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 100) {

      console.log('Scrolled to bottom');
      if (this.selectedIndex === 0) {
        console.log('Load more videos');
        this.loadMoreVideos();
      }
      if (this.selectedIndex === 2) {
        console.log('Load more liked videos');
        this.loadMoreLikedVideos();
      }

    }
  }

  loadMoreLikedVideos() {
    combineLatest([
      this.store.select(state => state.profile.isLoadingLikedVideos),
      this.store.select('profile', 'canLoadMoreLikedVideos'),
      this.likedVideoList$
    ]).pipe(
      take(1)
    ).subscribe(([isLoading, canLoadMore, likedVideoList]) => {
      console.log('isLoading:', isLoading, 'canLoadMoreLikedVideos:', canLoadMore, 'current liked video count:', likedVideoList.length);
      if (!isLoading && canLoadMore) {
        this.store.dispatch(ProfileActions.getLikedVideos({
          profileId: this.profileId,
          orderBy: 'desc',
          page: Math.floor(likedVideoList.length / 10)
        }));
      }
    });
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
        const child = this.activatedRoute.firstChild;
        const path = child?.snapshot.routeConfig?.path;
        const idx = this.tabRoutes.indexOf(path || 'all');
        this.selectedIndex = idx === -1 ? 0 : idx;
      }),
      this.activatedRoute.params.subscribe(params => {
        if (params['profileId'] && params['profileId'] !== this.profileId) {
          this.store.dispatch(ProfileActions.clearProfileState());
          this.profileId = params['profileId'];
          console.log('Profile ID changed to:', this.profileId);
          this.store.dispatch(ProfileActions.getUserVideos({
            profileId: this.profileId,
            orderBy: 'desc',
            page: 0
          }));
          this.store.dispatch(ProfileActions.getProfile({userId: this.profileId}));
          this.store.dispatch(ProfileActions.getLikedVideos({
            profileId: this.profileId,
            orderBy: 'desc',
            page: 0
          }));
          this.store.dispatch(PlayListAction.loadAllPlaylists({profileID: this.profileId}));

          this.authService.getCurrentUserId().then(currentUserId => {
            this.isOwnProfile = currentUserId === this.profileId;
          });
        }
      }),
      this.store.select(state => state.profile.profile).subscribe(profile => {
        if (profile) {
          this.profile = profile;
        }
      })
    );
    this.profileId = this.activatedRoute.snapshot.params['profileId'];
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


    this.store.dispatch(ProfileActions.getLikedVideos({
      profileId: this.profileId,
      orderBy: 'desc',
      page: 0
    }));

    this.authService.getCurrentUserId().then(
      currentUserId => {
        this.isOwnProfile = currentUserId === this.profileId;
      }
    )
  }


  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
    this.subscription = [];
    this.store.dispatch(ProfileActions.clearProfileState());
  }

  onTabChange(idx: number) {
    this.selectedIndex = idx;
    const route = this.tabRoutes[idx];
    this.router.navigate([route], {relativeTo: this.activatedRoute});
  }

  toggleFollow(profile: ProfileModel, isFollowing: boolean) {
    this.store.dispatch(ProfileActions.toggleFollowUser({userId: profile.id}));
  }

}
