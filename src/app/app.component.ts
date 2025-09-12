import {Component, computed, OnInit, signal, ViewChild} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {
  ActivatedRoute,
  IsActiveMatchOptions, NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MaterialAngularModule} from './modules/material-angular/material-angular.module';
import {MatDrawerMode} from '@angular/material/sidenav';
import {HeaderComponent} from './components/header/header.component';
import supabase from './utils/supabase';
import {Store} from '@ngrx/store';
import {AuthState} from './ngrx/states/auth.state';
import {Observable, Subscription} from 'rxjs';
import {logout, storeAuth} from './ngrx/actions/auth.actions';
import {AuthModel} from './models/auth.model';
import {AsyncPipe, NgClass} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    SidebarComponent,
    MaterialAngularModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    MatFormFieldModule,
    AsyncPipe,
    NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Relsvido';

  userId = signal<string | null>(null);
  collapsed = signal(false);
  isSmallScreen: boolean = false;
  sidebarMode = signal<MatDrawerMode>('side');
  sidebarWidth = computed(() => this.collapsed() ? 'fit-content' : '240px');

  subscription: Subscription[] = [];
  isLoggingIn$: Observable<boolean>
  headerTitle: string = '';
  isSearchActive = false;
  sections: any[] = [];

  @ViewChild('searchSidenav') searchSidenav!: any;

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<{ auth: AuthState }>,
              private router: Router, private activatedRoute: ActivatedRoute,) {
    this.router.events.subscribe(() => {
      const child = this.activatedRoute.firstChild;
      // You can use the headerTitle for something if needed
      this.headerTitle = child?.snapshot.data['headerTitle'];
    });

    this.breakpointObserver.observe(['(max-width: 599px)']).subscribe(result => {
      this.collapsed.set(result.matches);
      this.sidebarMode.set(result.matches ? 'over' : 'side');
      this.isSmallScreen = result.matches;
    });

    this.isLoggingIn$ = this.store.select(state => state.auth.isAuthenticating);

    const {data} = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
      if (event === 'SIGNED_IN') {
        console.log(session?.user)
        this.store.dispatch(storeAuth({auth: session as AuthModel}));

      } else if (event === 'SIGNED_OUT') {
        this.store.dispatch(logout());
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      }
    })
  }

  ngOnInit() {
    const matchOptions: IsActiveMatchOptions = {
      paths: 'subset', // Use 'subset' to match any route starting with /studio
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    };

    supabase.auth.getUser().then(({data: {user}}) => {
      if (this.checkInStudioRoute(matchOptions)) {
        return;
      }
      if (user?.id) {
        this.userId.set(user.id);
        this.updateSections();
      } else {
        this.userId.set(null);
        this.updateSections();
      }
    });

    // set lần đầu
    this.isSearchActive = this.router.isActive('/search', matchOptions);

    this.subscription.push(
      this.router.events
        .pipe(filter((e: any) => e instanceof NavigationEnd),)
        .subscribe(() => {
          this.isSearchActive = this.router.isActive('/search', matchOptions);

          if (this.checkInStudioRoute(matchOptions)) {
          } else {
            this.updateSections()
          }
        }),
      this.store.select(state => state.auth.auth.user).subscribe(user => {
        if (this.checkInStudioRoute(matchOptions)) {
          return;
        }
        if (user?.id) {
          this.userId.set(user.id);
          this.updateSections();
        } else {
          this.userId.set(null);
          this.updateSections();
        }
      }),
    )
  }

  checkInStudioRoute(matchOptions: IsActiveMatchOptions) {
    const isInStudioRoute = this.router.isActive('/studio', matchOptions);
    if (isInStudioRoute) {
      this.sections = [
        {
          routes: [
            {path: '/studio/upload', icon: 'upload', label: 'Upload'},
            {path: '/studio/analytics', icon: 'analytics', label: 'Analytics'}
          ]
        }
      ];
    }
    return isInStudioRoute;
  }

  updateSections() {
    const uid = this.userId();
    if (!uid) {
      this.sections = [
        {
          routes: [
            {path: '/home', icon: 'home', label: 'Home'},
            {path: '/exploring', icon: 'explore', label: 'Explore'},
            {path: '/search', icon: 'search', label: 'Search'}
          ]
        }
      ];
    } else {
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
  }

  calculateMargin() {
    if (this.isSmallScreen) {
      return '0';
    }
    return this.collapsed() ? '100px' : '240px';
  }

  toggleSidebar() {
    this.collapsed.set(!this.collapsed())
  }

  toggleSearchSidenav() {
    if (this.searchSidenav?.opened) {
      this.searchSidenav.close();
    } else {
      this.searchSidenav.open();
    }
  }

  onSearch(event: Event) {
    this.toggleSearchSidenav();
    this.router.navigate(['/search'], {queryParams: {q: (event.target as HTMLInputElement).value}}).then();
  }

  onOtherClick() {
    if (this.searchSidenav?.opened) {
      this.searchSidenav.close();
    }
  }
}
