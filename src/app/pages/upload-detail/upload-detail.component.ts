import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {map, Observable, startWith, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatInput} from '@angular/material/input';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {Store} from '@ngrx/store';
import {CategoryState} from '../../ngrx/states/category.state';
import * as CategoryActions from '../../ngrx/actions/category.actions';
import * as VideoActions from '../../ngrx/actions/video.actions';
import {VideoModel} from '../../models/video.model';
import {VideoState} from '../../ngrx/states/video.state';

@Component({
  selector: 'app-upload-detail',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButton,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    ReactiveFormsModule,
    MatInput,
    MatRadioButton,
    MatRadioGroup,
  ],
  templateUrl: './upload-detail.component.html',
  styleUrl: './upload-detail.component.scss'
})
export class UploadDetailComponent implements OnInit, OnDestroy {

  myControl = new FormControl('', {nonNullable: true, validators: [Validators.required]});
  filteredOptions$!: Observable<{
    id: string;
    name: string;
  }[]>;
  subscriptions: Subscription[] = [];
  videoDetails$: Observable<VideoModel>
  isGettingVideoInfo$: Observable<boolean>
  isCreatVideoInfoSuccess$: Observable<boolean>

  constructor(private activatedRoute: ActivatedRoute, private store: Store<{
    category: CategoryState,
    video: VideoState
  }>, private router: Router) {
    const videoId = this.activatedRoute.snapshot.paramMap.get('videoId');

    if (!videoId) {
      this.router.navigate(['/upload']);
    }

    this.isGettingVideoInfo$ = this.store.select(state => state.video.isGetting)
    this.isCreatVideoInfoSuccess$ = this.store.select(state => state.video.isCreateInfoSuccess)
    this.videoDetails$ = this.store.select(state => state.video.videoDetail)
    this.filteredOptions$ = this.store.select(state => state.category.categories)

    this.store.dispatch(CategoryActions.getAllCategories())
    this.store.dispatch(VideoActions.getVideoInfo({videoId: videoId!}))
  }

  ngOnInit() {
    this.subscriptions.push(

    )

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.store.dispatch(VideoActions.clearVideoState())
  }


  get outlineColor(): 'primary' | 'warn' {
    return this.myControl.invalid && this.myControl.touched ? 'warn' : 'primary';
  }


  get errorMessage(): string | null {
    if (this.myControl.hasError('required')) return 'Category is required';
    return null;
  }
}
