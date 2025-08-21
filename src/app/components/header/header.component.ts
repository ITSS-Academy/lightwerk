import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, Router} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleMenuEvent = new EventEmitter();

  headerTitle: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(() => {
      const child = this.activatedRoute.firstChild;
      this.headerTitle = child?.snapshot.data['headerTitle'];
    });
  }

  toggleMenu() {
    this.toggleMenuEvent.emit();
  }

}
