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
import {NgClass, NgStyle, SlicePipe} from '@angular/common';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {convertToSupabaseUrl} from '../../utils/img-converter';
import {Store} from '@ngrx/store';
import {VideoState} from '../../ngrx/states/video.state';
import * as VideoActions from '../../ngrx/actions/video.actions';
import {Subscription} from 'rxjs';
import {VideoModel} from '../../models/video.model';

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
    SlicePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
  isExpanded = false;
  showCommentExpanded = false;

  subscriptions: Subscription[] = []

  @ViewChild('pageContainer', {static: true}) pageContainerRef!: ElementRef;
  viewportWidth = 0;
  viewportHeight = 0;

  constructor(private cdr: ChangeDetectorRef, private store: Store<{
    video: VideoState
  }>) {
    this.store.dispatch(VideoActions.getLatestVideos({
      page: 0
    }))
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(state => state.video.latestVideos).subscribe(videos => {
        console.log(videos)
        this.cards = videos;
      })
    )

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit() {
    this.updateContainerSize();
    this.cdr.detectChanges();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateContainerSize();
  }

  updateContainerSize() {
    if (this.pageContainerRef && this.pageContainerRef.nativeElement) {
      const rect = this.pageContainerRef.nativeElement.getBoundingClientRect();
      this.viewportWidth = rect.width;
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
      width = this.viewportWidth - (100 + 32 + 16);
      height = width / videoRatio;
    } else {
      height = this.viewportHeight - ((100 + 32 + 16));
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
