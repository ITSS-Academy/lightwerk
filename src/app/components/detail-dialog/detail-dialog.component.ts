import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener, inject, model,
  OnDestroy,
  OnInit, signal,
  ViewChild
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatCard, MatCardAvatar, MatCardHeader, MatCardTitleGroup} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormField, MatHint, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {AsyncPipe, DatePipe, NgClass, NgStyle} from '@angular/common';
import {DialogVideoComponent} from '../dialog-video/dialog-video.component';
import {convertToSupabaseUrl} from '../../utils/img-converter';
import {Observable, Subscription} from 'rxjs';
import {DIALOG_DATA} from '@angular/cdk/dialog';
import {Store} from '@ngrx/store';
import * as VideoActions from '../../ngrx/actions/video.actions';
import {VideoModel} from '../../models/video.model';
import {VideoState} from '../../ngrx/states/video.state';
import {VideoComponent} from '../video/video.component';
import supabase from '../../utils/supabase';
import {ProfileModel} from '../../models/profile.model';
import {CommentState} from '../../ngrx/states/comment.state';
import {CommentModel} from '../../models/comment.model';
import * as CommentAction from '../../ngrx/actions/comment.actions';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as SearchActions from '../../ngrx/actions/search.actions';

@Component({
  selector: 'app-detail-dialog',
  imports: [MatDialogModule, MatButton, MatIconModule, MatFormField, MatFormField, MatInput, MatSuffix, MatFormField, MatLabel, MatIconButton, NgClass, NgStyle, VideoComponent, AsyncPipe, DatePipe, ReactiveFormsModule, FormsModule, MatFabButton],
  templateUrl: './detail-dialog.component.html',
  styleUrl: './detail-dialog.component.scss'
})
export class DetailDialogComponent implements AfterViewInit, OnInit, OnDestroy {

  readonly data = inject<{ video: VideoModel }>(MAT_DIALOG_DATA);
  video = model(this.data.video);

  isExpanded = false;
  isFavoriteActive = false
  isSavetagActive = false
  isFollowing = false
  subscriptions: Subscription[] = [];
  videoId: string = ''
  title: string = ''
  description: string = ''
  username: string = ''
  userAvatar: string = ''
  comments$!: Observable<CommentModel[]>;
  comments!: CommentModel[];
  commentContent: string = '';


  videoDetail$: Observable<VideoModel>
  isCurrentUserSignal = signal<boolean>(true);

  @ViewChild('pageContainer', {static: true}) pageContainerRef!: ElementRef;
  viewportWidth = 0;
  viewportHeight = 0;

  constructor(private dialogRef: MatDialogRef<DetailDialogComponent>,
              private cdr: ChangeDetectorRef,
              private store: Store<{
                video: VideoState
                comment: CommentState,
              }>
  ) {
    this.comments$ = this.store.select(state => state.comment.comments);
    this.videoDetail$ = this.store.select(state => state.video.videoDetail);
    console.log('DetailDialogComponent loaded');
    this.store.dispatch(VideoActions.getVideoDetail({videoId: this.video().id}))
    this.store.dispatch(CommentAction.getAllComments({videoId: this.video().id}));
  }

  ngOnInit() {
    // Example subscription (replace with actual observables as needed)
    this.subscriptions.push(
      this.dialogRef.afterOpened().subscribe(() => {
        this.updateContainerSize()
      }),
      this.videoDetail$.subscribe(async detail => {
        if (detail.id) {
          console.log(detail.id)
          this.videoId = detail.id;
          this.title = detail.title || '';
          this.description = detail.description || '';
          this.username = detail.profile?.username || '';
          this.userAvatar = detail.profile?.avatarPath || '';

          // Check if current user is the video's owner
          const {data, error} = await supabase.auth.getSession();
          if (!error) {
            console.log(data.session?.user?.id == detail.profileId);
            console.log(detail.profileId);
            this.isCurrentUserSignal.set(data.session?.user?.id == detail.profileId);
          } else {
            this.isCurrentUserSignal.set(false);
          }
        }
      })
    );

    console.log(this.video())
    this.store.dispatch(VideoActions.getVideoDetail({videoId: this.video().id}))
    this.subscriptions.push(
      this.comments$.subscribe(comments => {
        this.comments = comments;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.store.dispatch(VideoActions.clearVideoDetail())
  }

  ngAfterViewInit() {
    this.updateContainerSize();
    this.cdr.detectChanges();
  }

  updateContainerSize() {
    if (this.pageContainerRef && this.pageContainerRef.nativeElement) {
      const rect = this.pageContainerRef.nativeElement.getBoundingClientRect();
      this.viewportWidth = rect.width;
      this.viewportHeight = rect.height;
      console.log(this.viewportWidth, this.viewportHeight);
    }
  }

  getCardBoxStyle(card: { aspectRatio: string }) {
    if (!this.viewportWidth || !this.viewportHeight) return {};
    const [w, h] = card.aspectRatio.split(':').map(Number);
    if (!w || !h) return {};
    const videoRatio = w / h;
    const viewportRatio = this.viewportWidth / this.viewportHeight;
    let width, height;
    if (videoRatio > viewportRatio) {
      width = this.viewportWidth;
      height = width / videoRatio;
    } else {
      height = this.viewportHeight;
      width = height * videoRatio;
    }
    width = Math.max(0, width);
    height = Math.max(0, height);

    return {
      width: width + 'px',
      height: height + 'px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    };
  }

  @HostListener('window:resize')
  onResize() {
    this.updateContainerSize();
  }

  videoDetail =
    {videoSrc: 'video1.mp4', title: 'Video 1', aspectRatio: '9:16'}
  ;


  closeDialog() {
    this.dialogRef.close(); // Đóng dialog
  }

  toggleFollow(video: VideoModel, isFollowing: boolean) {
    const userId = video.profileId;
    this.store.dispatch(SearchActions.followUser({userId, shouldFollow: !isFollowing}));
  }


  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  onVideoReady() {
    this.videoReadyStates = true;
  }

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;
  videoReadyStates: boolean = false;

  createComment() {
    if (!this.commentContent.trim()) return;
    const videoId = this.video().id;
    this.store.dispatch(CommentAction.createComment({content: this.commentContent, videoId}));
    this.commentContent = '';
  }


}
