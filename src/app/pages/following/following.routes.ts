import {Routes} from '@angular/router';

export const followingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./following.component').then(m => m.FollowingComponent),
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', loadComponent: () => import('./components/list/list.component').then(m => m.ListComponent)},
      {path: 'grid', loadComponent: () => import('./components/grid/grid.component').then(m => m.GridComponent)},
      {
        path: 'user',
        loadComponent: () => import('./components/following-user/following-user.component').then(m => m.FollowingUserComponent)
      },
    ]
  },
];
