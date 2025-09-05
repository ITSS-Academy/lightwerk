import {Routes} from '@angular/router';
import {searchRoutes} from './pages/search/search.routes';

export const routes: Routes = [
  {
    path: 'upload-detail/:videoId',
    loadComponent: () => import('./pages/upload-detail/upload-detail.component').then(m => m.UploadDetailComponent),
    data: {headerTitle: 'Upload'}
  },
  {
    path: 'upload',
    loadComponent: () => import('./pages/create-video/create-video.component').then(m => m.CreateVideoComponent),
    data: {headerTitle: 'Upload'}
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    data: {
      headerTitle: 'Home',
    }
  },
  {
    path: 'history',
    loadComponent: () => import('./pages/history/history.component').then(m => m.HistoryComponent),
    data: {
      headerTitle: 'History',
    }
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/pages/search-page/search-page.component').then(m => m.SearchPageComponent),
    data: {
      headerTitle: 'Search',
    }
  },
  {
    path: 'search/user',
    loadComponent: () => import('./pages/search/pages/user-page/user-page.component').then(m => m.UserPageComponent),
    data: {
      headerTitle: 'Search',
    }
  },
  {
    path: 'search/video',
    loadComponent: () => import('./pages/search/pages/video-page/video-page.component').then(m => m.VideoPageComponent),
    data: {
      headerTitle: 'Search',
    }
  },
  {
    path: 'following',
    loadChildren: () => import('./pages/following/following.routes').then(m => m.followingRoutes),
    data: {
      headerTitle: 'Following',
    }
  },
  {
    path: 'exploring',
    loadComponent: () => import('./pages/exploring/exploring.component').then(m => m.ExploringComponent),
    data: {
      headerTitle: 'Explore',
    }
  },

  {
    path: 'history',
    loadComponent: () => import('./pages/history/history.component').then(m => m.HistoryComponent),
    data: {
      headerTitle: 'History',
    }
  },
  {
    path: 'playlist/:playlistId',
    loadComponent: () => import('./pages/playlist-detail/playlist-detail.component').then(m => m.PlaylistDetailComponent),
    data: {
      headerTitle: 'Playlist',
    }
  },
  {
    path: 'profile/:profileId',
    loadChildren: () => import('./pages/profile/profile.routes').then(m => m.ProfileRoutes),
    data: {
      headerTitle: 'Profile',
    }
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./pages/auth-callback/auth-callback.component').then(m => m.AuthCallbackComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
