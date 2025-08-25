import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger, MatMenuModule} from '@angular/material/menu';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {AuthService} from '../../services/auth/auth.service';
import supabase from '../../utils/supabase';

@Component({
  selector: 'app-header',
  imports: [
    MatIconButton,
    MatToolbar,
    MatIconModule,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatDialogModule,
    MatMenuModule,
    LoginDialogComponent,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleMenuEvent = new EventEmitter();

  headerTitle: string = '';
  canOpenCreateMenu = false;
  @ViewChild('createMenuTrigger', {static: false}) createMenuTrigger?: MatMenuTrigger;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.router.events.subscribe(() => {
      const child = this.activatedRoute.firstChild;
      this.headerTitle = child?.snapshot.data['headerTitle'];
    });
  }

  toggleMenu() {
    this.toggleMenuEvent.emit();
  }

  async openCreateMenu(event: Event, menuTrigger: MatMenuTrigger) {
    event.preventDefault();
    event.stopPropagation();
    if (!(await this.authService.isLoggedIn())) {
      this.dialog.open(LoginDialogComponent, {width: '350px'});
      return;
    }
    this.canOpenCreateMenu = true;
    setTimeout(() => {
      menuTrigger.openMenu();
    });
  }

  onCreateMenuClosed() {
    this.canOpenCreateMenu = false;
  }

  logOut() {
    supabase.auth.signOut().then(({error}) => {
      if (error) {
        console.error('Logout error:', error);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
