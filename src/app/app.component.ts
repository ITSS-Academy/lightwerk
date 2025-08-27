import {Component, computed, signal} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MaterialAngularModule} from './modules/material-angular/material-angular.module';
import {MatDrawerMode} from '@angular/material/sidenav';
import {HeaderComponent} from './components/header/header.component';
import supabase from './utils/supabase';
import {Store} from '@ngrx/store';
import {AuthState} from './ngrx/states/auth.state';
import {Observable} from 'rxjs';
import {logout, storeAuth} from './ngrx/actions/auth.actions';
import {AuthModel} from './models/auth.model';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, MaterialAngularModule, RouterLink, RouterLinkActive, HeaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Relsvido';

  collapsed = signal(false);
  isSmallScreen: boolean = false;
  sidebarMode = signal<MatDrawerMode>('side');

  sidebarWidth = computed(() => this.collapsed() ? 'fit-content' : '240px');

  isLoggingIn$: Observable<boolean>

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<{ auth: AuthState }>) {
    this.breakpointObserver.observe(['(max-width: 599px)']).subscribe(result => {
      this.collapsed.set(result.matches);
      this.sidebarMode.set(result.matches ? 'over' : 'side');
      this.isSmallScreen = result.matches;
    });

    this.isLoggingIn$ = this.store.select(state => state.auth.isAuthenticating);

    const {data} = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
      if (event === 'SIGNED_IN') {
        this.store.dispatch(storeAuth({auth: session as AuthModel}));

      } else if (event === 'SIGNED_OUT') {
        this.store.dispatch(logout());
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      }
    })
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
}
