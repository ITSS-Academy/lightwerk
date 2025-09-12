import {Component, OnInit, ViewChild, AfterViewInit, inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule, MatStepper} from '@angular/material/stepper';
import {Router, ActivatedRoute} from '@angular/router';
import {v4 as uuidv4} from 'uuid';
import {Store} from '@ngrx/store';
import {VideoState} from '../../ngrx/states/video.state';
import * as VideoActions from '../../ngrx/actions/video.actions';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {UploadVideoModel, VideoModel} from '../../models/video.model';
import * as CategoryActions from '../../ngrx/actions/category.actions';
import {CategoryState} from '../../ngrx/states/category.state';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDivider} from '@angular/material/divider';
import {take, filter} from 'rxjs/operators';
import {convertToSupabaseUrl} from '../../utils/img-converter';
import {DurationPipe} from '../../utils/duration.pipe';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    AsyncPipe,
    MatProgressSpinnerModule,
    MatDivider,
    DurationPipe
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit, OnDestroy, AfterViewInit {
  videoFormGroup: FormGroup;
  infoFormGroup: FormGroup;
  selectedFile: File | null = null;
  thumbnailFile: File | null = null;
  thumbnailPreview: string | null = null;
  videoId: string | null = null;
  @ViewChild('stepper') stepper!: MatStepper;
  private shouldGoToStep2 = false;
  isUploadFileSuccess$: Observable<boolean>
  subscriptions: Subscription[] = [];
  isUploadingFile$: Observable<boolean>
  video$: Observable<VideoModel>
  isGettingVideoInfo$: Observable<boolean>
  isCreatVideoInfoSuccess$: Observable<boolean>
  categories$: Observable<{
    id: string;
    name: string
  }[]>
  isCreatingVideoInfo$: Observable<boolean>
  private _snackBar = inject(MatSnackBar);


  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private store: Store<{
    video: VideoState,
    category: CategoryState
  }>) {
    this.isCreatingVideoInfo$ = this.store.select(state => state.video.isCreatingInfo)
    this.isUploadFileSuccess$ = this.store.select(state => state.video.isCreateSuccess)
    this.isGettingVideoInfo$ = this.store.select(state => state.video.isGetting)
    this.video$ = this.store.select(state => state.video.videoDetail)
    this.isUploadingFile$ = this.store.select(state => state.video.isCreating)
    this.isCreatVideoInfoSuccess$ = this.store.select(state => state.video.isCreateInfoSuccess)
    this.categories$ = this.store.select(state => state.category.categories)
    this.videoFormGroup = this.fb.group({
      video: [null, Validators.required]
    });
    this.infoFormGroup = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      visibility: ['public', Validators.required],
      category: ['', Validators.required],
      thumbnail: [null]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.videoFormGroup.patchValue({video: this.selectedFile});
      this.extractVideoDuration(this.selectedFile);
    }
  }

  extractVideoDuration(file: File) {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      const duration = Math.round(video.duration);
      this.infoFormGroup.patchValue({duration: duration});
    };
    video.src = URL.createObjectURL(file);
  }

  onThumbnailSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.thumbnailFile = input.files[0];
      this.infoFormGroup.patchValue({thumbnail: this.thumbnailFile});
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.thumbnailPreview = e.target.result;
      };
      reader.readAsDataURL(this.thumbnailFile);
    }
  }


  onSubmit() {
    //reset form and go to analytics page
    this.infoFormGroup.reset();
    this.videoFormGroup.reset();
    this.videoId = null;
    this.thumbnailFile = null;
    this.thumbnailPreview = null;
    this.selectedFile = null;
    this.router.navigate(['/studio/analytics']);
  }

  async onContinueStep1() {
    if (this.selectedFile) {
      this.videoId = uuidv4();

      this.store.dispatch(VideoActions.uploadVideo({
        file: this.selectedFile,
        videoId: this.videoId
      }))
      // reset form
      // Generate uuid and update query string

    }
  }

  onContinueStep2() {
    if (this.infoFormGroup.valid && this.videoId) {
      const videoData: UploadVideoModel = {
        id: this.videoId,
        title: this.infoFormGroup.get('title')?.value,
        description: this.infoFormGroup.get('description')?.value,
        isPublic: this.infoFormGroup.get('visibility')?.value === 'public',
        categoryId: this.infoFormGroup.get('category')?.value,
        thumbnail: this.thumbnailFile
      };
      this.store.dispatch(VideoActions.createVideoInfo({video: videoData}))
      // reset form

    } else {
      this._snackBar.open('Please fill all required fields', 'Close', {duration: 3000});
    }
  }

  ngOnInit() {
    this.store.dispatch(CategoryActions.getAllCategories());
    this.subscriptions.push(
      this.route.queryParamMap.subscribe(params => {
        this.videoId = params.get('videoId');
        if (this.videoId) {
          // Fetch video info first
          this.store.dispatch(VideoActions.getVideoInfo({videoId: this.videoId}));
          this.video$.pipe(
            filter(video => !!video && Object.keys(video).length > 0),
            take(1)
          ).subscribe(video => {
            console.log('video', video)
            if (video && video.id && video.status !== 'editing') {
              // Remove videoId from query params and do not proceed
              console.log('ấdf', video)
              this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {videoId: null},
                queryParamsHandling: 'merge',
              });
            }
            if (video && video.id && video.status === 'editing') {
              if (!this.videoFormGroup.get('video')?.value) {
                this.videoFormGroup.patchValue({video: 'dummy'});
                this.videoFormGroup.markAsDirty();
                this.videoFormGroup.markAsTouched();
              }
              if (this.stepper) {
                Promise.resolve().then(() => this.stepper.selectedIndex = 1);
              } else {
                this.shouldGoToStep2 = true;
              }
            }
          });
        }
      }),
      this.isCreatVideoInfoSuccess$.subscribe(success => {
        if (success) {
          this.store.dispatch(VideoActions.getVideoInfo({videoId: this.videoId!}))
          this.stepper.next()
        }
      }),
      this.isUploadFileSuccess$.subscribe(success => {
        if (success) {
          this.store.dispatch(VideoActions.getVideoInfo({
            videoId: this.videoId!
          }))
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {videoId: this.videoId},
            queryParamsHandling: 'merge',
          }).then(() => {

          });
        }
      }),
    )
  }

  ngAfterViewInit() {
    console.log(this.shouldGoToStep2, this.stepper);
    if (this.shouldGoToStep2 && this.stepper) {
      console.log(this.stepper.selectedIndex);
      this.store.dispatch(VideoActions.getVideoInfo({videoId: this.videoId!}))
      this.stepper.selectedIndex = 1;
      this.shouldGoToStep2 = false;
      console.log(this.stepper.selectedIndex);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.store.dispatch(VideoActions.clearVideoState())
  }

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;
}
