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
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCard, MatCardAvatar, MatCardHeader, MatCardTitleGroup} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormField, MatHint, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {AsyncPipe, NgClass, NgStyle} from '@angular/common';
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

@Component({
  selector: 'app-detail-dialog',
  imports: [MatDialogModule, MatButton, MatCard, MatCardAvatar, MatCardHeader, MatCardTitleGroup, MatIconModule, MatFormField, MatFormField, MatInput, MatSuffix, MatFormField, MatLabel, MatHint, MatIconButton, NgClass, NgStyle, DialogVideoComponent, VideoComponent, AsyncPipe],
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

  videoDetail$: Observable<VideoModel>
  isCurrentUserSignal = signal<boolean>(true);

  @ViewChild('pageContainer', {static: true}) pageContainerRef!: ElementRef;
  viewportWidth = 0;
  viewportHeight = 0;

  constructor(private dialogRef: MatDialogRef<DetailDialogComponent>,
              private cdr: ChangeDetectorRef,
              private store: Store<{
                video: VideoState
              }>
  ) {
    this.videoDetail$ = this.store.select(state => state.video.videoDetail)
    console.log('DetailDialogComponent loaded');
    this.store.dispatch(VideoActions.getVideoDetail({videoId: this.video().id}))
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

  comment = [
    {
      id: 1,
      name: "Mạnh Mèo",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 28, 2022"
    },
    {
      id: 2,
      name: "Anh Bi",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      date: "July 28, 2022"
    },
    {
      id: 3,
      name: "Bé My",
      avatar: "https://i.pravatar.cc/40?img=3",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 29, 2022"
    },
    {
      id: 4,
      name: "Chị Đen",
      avatar: "https://i.pravatar.cc/40?img=4",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 30, 2022"
    },
    {
      id: 5,
      name: "Anh Lu Lu",
      avatar: "https://i.pravatar.cc/40?img=5",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 28, 2022"
    },
    {
      id: 6,
      name: "Mạnh Mèo",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 28, 2022"
    },
    {
      id: 7,
      name: "Anh Bi",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      date: "July 28, 2022"
    },
    {
      id: 8,
      name: "Bé My",
      avatar: "https://i.pravatar.cc/40?img=3",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 29, 2022"
    },
    {
      id: 9,
      name: "Chị Đen",
      avatar: "https://i.pravatar.cc/40?img=4",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 30, 2022"
    },
    {
      id: 10,
      name: "Anh Lu Lu",
      avatar: "https://i.pravatar.cc/40?img=5",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 28, 2022"
    },
    {
      id: 11,
      name: "Mạnh Mèo",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 28, 2022"
    },
    {
      id: 12,
      name: "Anh Bi",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      date: "July 28, 2022"
    },
    {
      id: 13,
      name: "Bé My",
      avatar: "https://i.pravatar.cc/40?img=3",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 29, 2022"
    },
    {
      id: 14,
      name: "Chị Đen",
      avatar: "https://i.pravatar.cc/40?img=4",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 30, 2022"
    },
    {
      id: 15,
      name: "Anh Lu Lu",
      avatar: "https://i.pravatar.cc/40?img=5",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 28, 2022"
    },
    {
      id: 16,
      name: "Mạnh Mèo",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 28, 2022"
    },
    {
      id: 17,
      name: "Anh Bi",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      date: "July 28, 2022"
    },
    {
      id: 18,
      name: "Bé My",
      avatar: "https://i.pravatar.cc/40?img=3",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 29, 2022"
    },
    {
      id: 19,
      name: "Chị Đen",
      avatar: "https://i.pravatar.cc/40?img=4",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 30, 2022"
    },
    {
      id: 20,
      name: "Anh Lu Lu",
      avatar: "https://i.pravatar.cc/40?img=5",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at",
      date: "July 28, 2022"
    }
  ];

  closeDialog() {
    this.dialogRef.close(); // Đóng dialog
  }

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  onVideoReady() {
    this.videoReadyStates = true;
  }

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;
  videoReadyStates: boolean = false;


}
