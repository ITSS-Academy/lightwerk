import {Routes} from '@angular/router';

export const routes: Routes = [
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
    loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent),
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
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
