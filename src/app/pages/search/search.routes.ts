import {Routes} from '@angular/router';
import {UserPageComponent} from './pages/user-page/user-page.component';

export const searchRoutes: Routes = [

  {
    path: '',
    loadComponent: () => import('./pages/search-page/search-page.component').then(m => m.SearchPageComponent),
  },
  {
    path: 'user',
    loadComponent: () => import('./pages/user-page/user-page.component').then(m => m.UserPageComponent),
  },
  {
    path: 'video',
    loadComponent: () => import('./pages/video-page/video-page.component').then(m => m.VideoPageComponent),
  },

];
