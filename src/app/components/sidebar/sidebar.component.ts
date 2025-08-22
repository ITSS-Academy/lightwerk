import {Component, Input} from '@angular/core';
import {MaterialAngularModule} from '../../modules/material-angular/material-angular.module';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [MaterialAngularModule, RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  @Input() collapsed!: boolean

  protected readonly RouterLink = RouterLink;
  protected readonly sections = sections;
}

const sections = [
  {
    // header: 'Main',
    routes: [
      {path: '/home', icon: 'home', label: 'Home'},
      {path: '/exploring', icon: 'explore', label: 'Explore'},
      {
        path: '/following', icon: 'subscriptions', label: 'Following'
      },
      {path: '/search', icon: 'search', label: 'Search'}
    ]
  },
  {
    header: 'Library',
    routes: [
      {path: '/history', icon: 'history', label: 'History'},
      {path: '/profile/1/liked-videos', icon: 'thumb_up', label: 'Liked Videos'},
      {path: '/profile/1/playlists', icon: 'playlist_play', label: 'Playlist'}
    ]
  },


];
