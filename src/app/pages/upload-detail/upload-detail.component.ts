import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {map, Observable, startWith, Subscription, combineLatest, take} from 'rxjs';
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
import {filter} from 'rxjs/operators';
import {convertToSupabaseUrl} from '../../utils/img-converter';

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

  uploadForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    description: new FormControl('', [Validators.maxLength(500)]),
    category: new FormControl('', [Validators.required]),
    thumbnail: new FormControl<File | null>(null),
    privacy: new FormControl('public', [Validators.required]),
  });
  filteredOptions$!: Observable<{
    id: string;
    name: string;
  }[]>;
  subscriptions: Subscription[] = [];
  videoDetails$: Observable<VideoModel>
  isGettingVideoInfo$: Observable<boolean>
  isCreatVideoInfoSuccess$: Observable<boolean>
  filteredCategories: { id: string; name: string }[] = [];
  filteredCategoriesNames!: Observable<string[]>
  thumbnailPreviewUrl: string | null = null;
  private previousObjectUrl: string | null = null;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<{
    category: CategoryState,
    video: VideoState
  }>, private router: Router) {
    const videoId = this.activatedRoute.snapshot.paramMap.get('videoId');


    this.isGettingVideoInfo$ = this.store.select(state => state.video.isGetting)
    this.isCreatVideoInfoSuccess$ = this.store.select(state => state.video.isCreateInfoSuccess)
    this.videoDetails$ = this.store.select(state => state.video.videoDetail)
    this.filteredOptions$ = this.store.select(state => state.category.categories)

    this.store.dispatch(CategoryActions.getAllCategories())
    this.store.dispatch(VideoActions.getVideoInfo({videoId: videoId!}))
  }

  ngOnInit() {
    this.subscriptions.push(
      this.filteredOptions$.subscribe(categories => {
        this.filteredCategories = categories;
      }),
      this.isCreatVideoInfoSuccess$.subscribe(isSuccess => {
        if (isSuccess) {
          this.router.navigate(['/profile/1/videos']).then();
        }
      })
    );

    this.videoDetails$.pipe(
      filter(video => !!video.id),
      take(1)
    ).subscribe((video: VideoModel) => {
      this.uploadForm.patchValue({
        privacy: video.isPublic ? 'public' : 'private',
      });
    })

    this.filteredCategoriesNames = combineLatest([
      this.uploadForm.get('category')!.valueChanges.pipe(startWith('')),
      this.filteredOptions$
    ]).pipe(
      map(([value, categories]) => {
        this.filteredCategories = categories;
        return this._filter(value || '');
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.store.dispatch(VideoActions.clearVideoState())
  }


  get outlineColor(): 'primary' | 'warn' {
    const control = this.uploadForm.get('category');
    return control && control.invalid && control.touched ? 'warn' : 'primary';
  }

  get errorMessage(): string | null {
    const control = this.uploadForm.get('category');
    if (control && control.hasError('required')) return 'Category is required';
    return null;
  }

  onCategoryInputEnter(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.validateCategoryInput();
  }

  onCategoryInputBlur() {
    this.validateCategoryInput();
  }

  private validateCategoryInput() {
    const value = this.uploadForm.get('category')!.value?.trim();
    const match = this.filteredCategories.some(cat => cat.name === value);
    if (!match) {
      this.uploadForm.get('category')!.setValue('');
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.filteredCategories.filter(option => option.name.toLowerCase().includes(filterValue)).map(v => v.name);
  }

  onSubmit() {
    if (this.uploadForm.invalid) {
      return;
    }
    const formValue = this.uploadForm.value;
    const videoId = this.activatedRoute.snapshot.paramMap.get('videoId') || '';

    const category = this.filteredCategories.find(cat => cat.name === formValue.category);
    if (!category) {
      this.uploadForm.get('category')!.setErrors({invalid: true});
      return;
    }
    this.store.dispatch(VideoActions.createVideoInfo({
      video: {
        id: videoId,
        title: formValue.title!,
        description: formValue.description || '',
        categoryId: category.id,
        isPublic: formValue.privacy === 'public',
        thumbnail: formValue.thumbnail ? formValue.thumbnail : null,
      }
    }));

  }

  onThumbnailSelected($event: any) {
    const file: File | null = $event.target.files && $event.target.files.length > 0 ? $event.target.files[0] : null;
    if (file) {
      // Revoke previous object URL if exists
      if (this.previousObjectUrl) {
        URL.revokeObjectURL(this.previousObjectUrl);
      }
      this.thumbnailPreviewUrl = URL.createObjectURL(file);
      this.previousObjectUrl = this.thumbnailPreviewUrl;
      this.uploadForm.get('thumbnail')!.setValue(file);
    }
  }

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;
}
