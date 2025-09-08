import {Component, Input, OnInit, signal, Output, EventEmitter, OnDestroy} from '@angular/core';
import {MaterialAngularModule} from '../../modules/material-angular/material-angular.module';
import {IsActiveMatchOptions, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgClass} from '@angular/common';
import supabase from '../../utils/supabase';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  imports: [MaterialAngularModule, RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit, OnDestroy {
  @Input() collapsed!: boolean

  isSearchActive = false;
  subscription: Subscription[] = [];

  userId = signal<string | null>(null)
  sections: any[] = [];

  @Output() searchClick = new EventEmitter<void>();

  constructor(private router: Router) {
  }

  ngOnInit() {
    supabase.auth.getUser().then(({data: {user}}) => {
      if (user?.id) {
        this.userId.set(user.id);
        this.updateSections();
      } else {
        this.updateSections();
      }
    });

    const matchOptions: IsActiveMatchOptions = {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    };


    // set lần đầu
    this.isSearchActive = this.router.isActive('/search', matchOptions);

    this.subscription.push(
      this.router.events
        .pipe(filter((e: any) => e instanceof NavigationEnd),)
        .subscribe(() => {
          this.isSearchActive = this.router.isActive('/search', matchOptions);
        }),
    )
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  protected readonly RouterLink = RouterLink;

  updateSections() {
    const uid = this.userId();
    this.sections = [
      {
        // header: 'Main',
        routes: [
          {path: '/home', icon: 'home', label: 'Home'},
          {path: '/exploring', icon: 'explore', label: 'Explore'},
          {path: '/following', icon: 'subscriptions', label: 'Following'},
          {path: '/search', icon: 'search', label: 'Search'}
        ]
      },
      {
        header: 'Library',
        routes: [
          {path: '/history', icon: 'history', label: 'History'},
          {path: uid ? `/profile/${uid}/liked-videos` : '', icon: 'thumb_up', label: 'Liked Videos'},
          {path: uid ? `/profile/${uid}/playlists` : '', icon: 'playlist_play', label: 'Playlist'}
        ]
      },
    ];
  }

  removeFocus($event: Event) {
    ($event.currentTarget as HTMLElement).blur();
  }

  searchclick1() {
    console.log('search clicked');
  }
}
