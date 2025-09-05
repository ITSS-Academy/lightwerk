import {Component, OnDestroy} from '@angular/core';
import {MatButtonModule,} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {FollowingState} from '../../ngrx/states/following.state';
import * as FollowingActions from '../../ngrx/actions/following.actions';

@Component({
  selector: 'app-following',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss'
})
export class FollowingComponent implements OnDestroy {
  constructor(public router: Router, public route: ActivatedRoute, private store: Store<{
    following: FollowingState
  }>) {
    this.store.dispatch(FollowingActions.getVideosFollowedChannels({
      page: 0
    }));
  }

  ngOnDestroy() {
    this.store.dispatch(FollowingActions.clearFollowingState());
  }

  isManageActive(): boolean {
    return this.router.url === '/following/user';
  }

  isGridActive(): boolean {
    return this.router.url === '/following' || this.router.url === '/following/grid';
  }

  isListActive(): boolean {
    return this.router.url === '/following/list';
  }

  goToManage() {
    this.router.navigate(['/following/user']);
  }

  goToGrid() {
    this.router.navigate(['/following/grid']);
  }

  goToList() {
    this.router.navigate(['/following/list']);
  }
}
