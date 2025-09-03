import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {VideoComponent} from '../../../../components/video/video.component';
import {convertToSupabaseUrl} from '../../../../utils/img-converter';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [
    MatButton,
    MatIconModule,
    MatIconButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    VideoComponent,
    NgStyle
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements AfterViewInit {
  isExpanded = false;
  showCommentExpanded = false;

  @ViewChild('pageContainer', {static: true}) pageContainerRef!: ElementRef;
  viewportWidth = 0;
  viewportHeight = 0;

  constructor(private cdr: ChangeDetectorRef) {
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


  cards = [
    {videoSrc: 'video1.mp4', title: 'Video 1', aspectRatio: '9:16'},
  ];
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
