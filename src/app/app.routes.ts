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
    path: 'playlist',
    loadComponent: () => import('./pages/playlist/playlist.component').then(m => m.PlaylistComponent),
    data: {
      headerTitle: 'Playlist',
    }
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
