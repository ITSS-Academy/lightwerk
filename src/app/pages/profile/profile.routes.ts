import {Routes} from '@angular/router';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {VideoComponent} from './components/video/video.component';
import {LikedVideosComponent} from './components/liked-videos/liked-videos.component';

export const ProfileRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./profile.component').then(m => m.ProfileComponent),
    children: [
      {path: '', redirectTo: 'videos', pathMatch: 'full'},
      {path: 'videos', component: VideoComponent},
      {path: 'playlists', component: PlaylistComponent},
      {path: 'liked-videos', component: LikedVideosComponent},
    ]
  },

];
