import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener, Input,
  OnDestroy,
  Output,
  ViewChild,
  EventEmitter, OnInit
} from '@angular/core';
import {AsyncPipe, NgStyle} from "@angular/common";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {VideoComponent} from "../video/video.component";
import {VideoModel} from '../../models/video.model';
import {MatIcon} from '@angular/material/icon';
import {convertToSupabaseUrl} from '../../utils/img-converter';
import * as VideoActions from '../../ngrx/actions/video.actions';
import {Store} from '@ngrx/store';
import {VideoState} from '../../ngrx/states/video.state';
import {Observable, Subscription, combineLatest} from 'rxjs';
import * as LikeVideoActions from '../../ngrx/actions/like-video.actions';
import {LikeVideoState} from '../../ngrx/states/like-video.state';
import {deleteLikeVideo} from '../../ngrx/actions/like-video.actions';
import {RouterLink} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-video-list',
  imports: [
    MatFabButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    VideoComponent,
    NgStyle,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss'
})
export class VideoListComponent implements AfterViewInit, OnInit, OnDestroy {
  isExpanded = false;
  showCommentExpanded = false;
  isFavoriteActive = false
  isSavetagActive = false

  pageContainerRef!: ElementRef;
  @Output() getMoreEvent = new EventEmitter<void>();

  @ViewChild('pageContainer', {static: false})
  set pageContainer(content: ElementRef) {
    this.pageContainerRef = content;
    if (this.pageContainerRef) {
      this.updateContainerSize();
    }
  }

  @ViewChild(VideoComponent) videoComponent!: VideoComponent;
  cardsContainerRef!: ElementRef;

  @ViewChild('cardsContainer', {static: false})
  set cardsContainer(content: ElementRef) {
    this.cardsContainerRef = content;
    if (this.cardsContainerRef) {
      this.setupObserver();
      if (this.cardsContainerRef) {
        this.cardsContainerRef.nativeElement.addEventListener('wheel', (e: WheelEvent) => {
          e.preventDefault();
          e.stopPropagation();
          this.cardsContainerRef.nativeElement.scrollBy({
            top: e.deltaY,
            behavior: 'smooth'
          });
        }, {passive: false});
      }

      document.addEventListener('fullscreenchange', () => {
        const containerEl = this.cardsContainerRef.nativeElement;
        const htmlItems: HTMLElement[] = Array.from(containerEl.children);

        const currentItem = htmlItems[this.currentVideoIndex];

        if (document.fullscreenElement) {
          this.previousScrollTop = currentItem.offsetTop;
          console.log('Entering fullscreen mode', this.previousScrollTop);
          containerEl.style.scrollSnapType = 'none';
          this.isFullscreen = true;
          // this.videoComponent.adjustControlButtons(true)
        } else {
          containerEl.style.scrollSnapType = 'y mandatory';
          containerEl.scrollTop = this.previousScrollTop;
          console.log('Exiting fullscreen mode', this.previousScrollTop);
          this.isFullscreen = false;
          // this.videoComponent.adjustControlButtons(false)
        }
      });


    } else {
      if (this.observer) this.observer.disconnect();
    }
  }


  viewportWidth = 0;
  viewportHeight = 0;

  private previousScrollTop: number = 0;
  currentVideoIndex: number = 0;
  isFullscreen: boolean = false;
  isGettingLikeComment: boolean = true;
  videoDetail!: VideoModel
  isLiking$: Observable<boolean>;

  observer!: IntersectionObserver

  videoReadyStates: boolean[] = [];
  subscription: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef,
              private store: Store<{
                video: VideoState,
                likeVideo: LikeVideoState
              }>,
  ) {
    this.isLiking$ = combineLatest([
      this.store.select(state => state.likeVideo.isAdding),
      this.store.select(state => state.likeVideo.isDeleting)
    ]).pipe(
      map(([isAdding, isDeleting]) => isAdding || isDeleting)
    );
  }

  ngOnInit() {
    this.subscription.push(this.store.select(state => state.video.videoDetail).subscribe(video => {
        this.store.select(state => state.video.videoDetail).subscribe(video => {
          this.videoDetail = video
        })
      }),
      this.store.select(state => state.likeVideo.isAddSuccess).subscribe(likeVideo => {
        if (likeVideo) {
          this.store.dispatch(VideoActions.getLikeCount({videoId: this.cards && this.cards.length > 0 ? this.cards[this.currentVideoIndex].id : ''}))
        }
      }),
      this.store.select(state => state.video.isGettingLikeComment).subscribe(isGetting => {
        this.isGettingLikeComment = isGetting
        this.cdr.detectChanges();
      }),
      this.store.select(state => state.likeVideo.isDeleteSuccess).subscribe(unlikeVideo => {
        if (unlikeVideo) {
          this.store.dispatch(VideoActions.getLikeCount({videoId: this.cards && this.cards.length > 0 ? this.cards[this.currentVideoIndex].id : ''}))
        }
      }),
    )


  }


  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    // Initialize videoReadyStates for all cards
    this.store.dispatch(VideoActions.getLikedVideos({
      videoId: this.cards && this.cards.length > 0 ? this.cards[0].id : ''
    }))
    this.videoReadyStates = this.cards ? Array(this.cards.length).fill(false) : [];
  }

  @HostListener('window:resize')
  onResize() {
    this.updateContainerSize();
  }

  updateContainerSize() {
    if (this.pageContainerRef && this.pageContainerRef.nativeElement) {
      const rect = this.pageContainerRef.nativeElement.getBoundingClientRect();
      console.log('Container size:', rect.width, rect.height);
      this.viewportWidth = (rect.width - 112) * 0.8;
      this.viewportHeight = rect.height;
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


  setupObserver() {
    if (this.observer) this.observer.disconnect();

    this.observer = new IntersectionObserver((entries) => {
      console.log('IntersectionObserver entries:', entries);
      entries.forEach(entry => {
        if (this.isFullscreen) return;
        if (entry.isIntersecting) {

          // nếu như mà phần tử hiện tại đang là video thì không làm gì cả
          const index = Array.from(this.cardsContainerRef.nativeElement.children).indexOf(entry.target);
          if (index !== -1 && index !== this.currentVideoIndex) {
            this.currentVideoIndex = index;
            this.store.dispatch(VideoActions.getLikedVideos({videoId: this.cards[this.currentVideoIndex].id}));

            if (this.currentVideoIndex == this.cards.length - 2) {
              console.log('Emitting getMoreEvent');
              this.getMoreEvent.emit();
            }

            // this.cards = this.cards.map((item, i) => ({
            //   ...item,
            //   type: i === this.currentVideoIndex ? 'video' : 'image',
            // }));

            setTimeout(() => this.observeAllElements())


          }
        }
      });
    }, {
      root: this.cardsContainerRef.nativeElement,
      threshold: 0.8 // Lowered for debugging
    });

    this.observeAllElements();
  }

  observeAllElements() {
    const elements = this.cardsContainerRef.nativeElement.querySelectorAll('.subItem');
    console.log('Observing elements:', elements);
    elements.forEach((el: Element) => {
      this.observer.observe(el);
    });
  }

  @Input() cards!: VideoModel[]
  videos = [
    {
      videoSrc: 'asdfas',
      aspectRatio: '16:9',
      profile: {}
    },
    {
      videoSrc: 'asdfas',
      aspectRatio: '9:16',
      profile: {}
    }
  ]

  comments = [
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
    }
  ];


  toggleComments() {
    this.showCommentExpanded = !this.showCommentExpanded;
  }

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;

  onVideoReady(index: number) {
    console.log('Video at index', index, 'is ready');
    this.videoReadyStates[index] = true;
    this.cdr.detectChanges();
  }

  toggleLike() {
    const videoId = this.cards && this.cards.length > 0 ? this.cards[this.currentVideoIndex].id : ''
    this.store.dispatch(LikeVideoActions.createLikeVideo({videoId}));
  }

  unlikeVideo() {
    const videoId = this.cards && this.cards.length > 0 ? this.cards[this.currentVideoIndex].id : ''
    this.store.dispatch(LikeVideoActions.deleteLikeVideo({videoId}));
  }

  protected readonly Math = Math;
}
