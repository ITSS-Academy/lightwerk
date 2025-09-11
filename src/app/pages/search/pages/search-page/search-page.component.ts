import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatFormField, MatInput} from '@angular/material/input';
import {SearchService} from '../../../../services/search/search.service';
import {VideoModel} from '../../../../models/video.model';
import {Store} from '@ngrx/store';
import {SearchState} from '../../../../ngrx/states/search.state';
import {Observable, Subscription} from 'rxjs';
import {ProfileModel} from '../../../../models/profile.model';
import * as SearchActions from '../../../../ngrx/actions/search.actions';
import {convertToSupabaseUrl} from '../../../../utils/img-converter';

@Component({
  selector: 'app-search-page',
  imports: [
    DatePipe,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardImage,
    MatIconModule,
    RouterLink,
    AsyncPipe,

  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  videos$!: Observable<VideoModel[]>;
  profiles$!: Observable<ProfileModel | null>;
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{
      search: SearchState
    }>,) {
    this.videos$ = this.store.select(state => state.search.isSearchingVideos);
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
        this.store.dispatch(SearchActions.searchVideos({query: q}));
      })
    );
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;
}
