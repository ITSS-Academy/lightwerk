import {Component, Input} from '@angular/core';
import {MaterialAngularModule} from '../../modules/material-angular/material-angular.module';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-sidebar',
    imports: [MaterialAngularModule, RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  @Input() collapsed!: boolean

  protected readonly RouterLink = RouterLink;
  protected readonly routes = routes;
}

const routes: {
  path: string;
  icon: string;
  label: string;
}[] = [
  {
    path: '/home',
    icon: 'home',
    label: 'Home'
  },
  // history
  {
    path: '/history',
    icon: 'history',
    label: 'History'
  },
  // playlist
  {
    path: '/playlist',
    icon: 'playlist_play',
    label: 'Playlist'
  }
]
