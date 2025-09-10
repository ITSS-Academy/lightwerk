import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {ProfileModel} from '../../../../models/profile.model';
import {Store} from '@ngrx/store';
import {SearchState} from '../../../../ngrx/states/search.state';
import * as SearchActions from '../../../../ngrx/actions/search.actions';
import {AsyncPipe} from '@angular/common';

interface UserModel {
  id: string;
  username: string;
  followers: number;
  bio: string;
  avatar: string;
}

@Component({
  selector: 'app-user-page',
  imports: [
    MatButton,
    MatIcon,
    RouterLink,
    AsyncPipe,

  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  profiles$!: Observable<ProfileModel | null>;
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{
      search: SearchState
    }>,) {
    this.profiles$ = this.store.select(state => state.search.isSearchingUser);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.queryParamMap.subscribe((params: any) => {
        const q = params.get('q');
        if (!q || q.trim() === '') {
          this.router.navigate(['/home']);
          return;
        }
        this.query = q;
        this.store.dispatch(SearchActions.searchUsers({query: q}));
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
