import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  ChangeDetectorRef,
  OnInit, OnDestroy
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../../services/auth/auth.service';
import supabase from '../../utils/supabase';
import {MatIconModule} from '@angular/material/icon';
import {VideoComponent} from '../../components/video/video.component';
import {AsyncPipe, NgClass, NgStyle, SlicePipe} from '@angular/common';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {convertToSupabaseUrl} from '../../utils/img-converter';
import {Store} from '@ngrx/store';
import {VideoState} from '../../ngrx/states/video.state';
import * as VideoActions from '../../ngrx/actions/video.actions';
import {Observable, Subscription, take} from 'rxjs';
import {VideoModel} from '../../models/video.model';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatIconModule,
    VideoComponent,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    NgClass,
    NgStyle,
    SlicePipe,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
  isExpanded = false;
  showCommentExpanded = false;
  isFavoriteActive = false
  isSavetagActive = false

  subscriptions: Subscription[] = []
  isGettingLatestVideos$: Observable<boolean>
  pageContainerRef!: ElementRef;

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
          this.videoComponent.adjustControlButtons(true)
        } else {
          containerEl.style.scrollSnapType = 'y mandatory';
          containerEl.scrollTop = this.previousScrollTop;
          console.log('Exiting fullscreen mode', this.previousScrollTop);
          this.isFullscreen = false;
          this.videoComponent.adjustControlButtons(false)
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

  observer!: IntersectionObserver

  constructor(private cdr: ChangeDetectorRef, private store: Store<{
    video: VideoState
  }>) {
    this.isGettingLatestVideos$ = this.store.select(state => state.video.isGettingLatest)

    this.store.dispatch(VideoActions.getLatestVideos({
      page: 0
    }))
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(state => state.video.latestVideos).subscribe(videos => {
        console.log(videos)
        this.cards = videos.map((v, index) => {
          return {
            ...v,
            type: index === this.currentVideoIndex ? 'video' : 'image',
          }
        })
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.observer) this.observer.disconnect();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();

  }

  @HostListener('window:resize')
  onResize() {
    this.updateContainerSize();
  }

  updateContainerSize() {
    if (this.pageContainerRef && this.pageContainerRef.nativeElement) {
      const rect = this.pageContainerRef.nativeElement.getBoundingClientRect();
      console.log('Container size:', rect.width, rect.height);
      this.viewportWidth = rect.width - 112;
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

            this.cards = this.cards.map((item, i) => ({
              ...item,
              type: i === this.currentVideoIndex ? 'video' : 'image',
            }));

            setTimeout(() => this.observeAllElements())

            // Ví dụ nếu bạn có component con
            // this.videoComponent.playVideo();
          }
        }
      });
    }, {
      root: this.cardsContainerRef.nativeElement,
      threshold: 0.1 // Lowered for debugging
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

  cards: VideoModel[] = [];
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


  toggleComments() {
    this.showCommentExpanded = !this.showCommentExpanded;
  }

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;
}
