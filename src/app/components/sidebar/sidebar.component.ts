import {Component, Input, OnInit, signal, Output, EventEmitter, OnDestroy} from '@angular/core';
import {MaterialAngularModule} from '../../modules/material-angular/material-angular.module';
import {IsActiveMatchOptions, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgClass} from '@angular/common';
import supabase from '../../utils/supabase';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/states/auth.state';

@Component({
  selector: 'app-sidebar',
  imports: [MaterialAngularModule, RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit, OnDestroy {
  @Input() collapsed!: boolean

  @Input() isSearchActive = false;
  subscription: Subscription[] = [];

  userId = signal<string | null>(null)
  @Input() sections: any[] = [];

  @Output() searchClick = new EventEmitter<void>();
  @Output() notSearchClick = new EventEmitter<void>();

  constructor(private router: Router, private store: Store<{
    auth: AuthState
  }>) {
  }

  ngOnInit() {
    supabase.auth.getUser().then(({data: {user}}) => {
      if (user?.id) {
        this.userId.set(user.id);
      } else {
        this.userId.set(null);
      }
    });


    this.subscription.push(
      this.store.select(state => state.auth.auth.user).subscribe(user => {
        if (user?.id) {
          this.userId.set(user.id);
        } else {
          this.userId.set(null);
        }
      }),
    )
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  protected readonly RouterLink = RouterLink;

  removeFocus($event: Event) {
    ($event.currentTarget as HTMLElement).blur();
  }

}
