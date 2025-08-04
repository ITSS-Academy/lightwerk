import {Component, computed, signal} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MaterialAngularModule} from './modules/material-angular/material-angular.module';
import {MatDrawerMode} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, MaterialAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fe-tiktok';
  collapsed = signal(false);
  isSmallScreen: boolean = false;
  sidebarMode = signal<MatDrawerMode>('side');

  sidebarWidth = computed(() => this.collapsed() ? '64px' : '240px');


  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 599px)']).subscribe(result => {
      this.collapsed.set(result.matches);
      this.sidebarMode.set(result.matches ? 'over' : 'side');
      this.isSmallScreen = result.matches;
    });
  }

  calculateMargin() {
    if (this.isSmallScreen) {
      return '0';
    }
    return this.collapsed() ? '64px' : '240px';
  }
}
