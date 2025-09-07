import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  Renderer2,
  Output,
  EventEmitter
} from '@angular/core';
import Player from 'video.js/dist/types/player';
import videojs from 'video.js';
import {FormsModule} from '@angular/forms';
import "videojs-hotkeys";
import {NgClass, NgStyle} from '@angular/common';


@Component({
  selector: 'app-video',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgStyle
  ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('target', {static: true}) target!: ElementRef;
  @Input() videoSrc!: string;
  @Input() aspectRatio!: string
  @Input() videoId!: string;
  @Input() thumbnailPath!: string;
  @Output() videoReady = new EventEmitter<void>();
  player!: Player;
  videoVisible = false;
  private previousScrollTop: number = 0;
  isExpanded = false;

  items: Array<{
    videoSrc: string;
    imgSrc: string;
    type: 'video' | 'image';
  }> = [];

  ngOnInit(): void {
    this.player = videojs(this.target.nativeElement, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      responsive: true,
      fluid: true,
      aspectRatio: this.aspectRatio,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      sources: [
        {
          src: this.videoSrc,
          type: 'application/vnd.apple.mpegurl',
        },
      ],
      html5: {
        hls: {
          overrideNative: true,
        },
        nativeAudioTracks: false,
        nativeVideoTracks: false,
      },
      plugins: {
        hotkeys: {
          seekStep: 5,
          enableModifiersForNumbers: false,
          enableVolumeScroll: false
        }
      }
    });

    this.player.on('canplay', () => {
      this.videoReady.emit();
    });

    this.player.ready(() => {
      // this.player.play();

      const dock = document.createElement('div');
      dock.style.position = 'absolute';
      dock.style.top = '10px';
      dock.style.left = '0';
      dock.style.width = '100%';
      dock.style.display = 'flex';
      dock.style.gap = '8px';
      dock.className = 'vjs-top-left-dock';
      this.player.el().appendChild(dock);

      // Lấy playToggle và volumePanel từ controlBar
      const playBtn = this.player!.getChild('ControlBar')!.getChild('PlayToggle')!.el();
      const volumePanel = this.player!.getChild('ControlBar')!.getChild('VolumePanel')!.el() as HTMLElement;

      volumePanel.setAttribute('tabindex', '-1'); // cho phép .focus()

      volumePanel.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'mouse') volumePanel.focus({preventScroll: true});
      });
      volumePanel.addEventListener('pointerleave', () => volumePanel.blur());

      // Gắn vào dock
      dock.appendChild(playBtn);
      dock.appendChild(volumePanel);

      // Chuyển các nút từ controlBar sang dock
      // dock.appendChild(this.player.controlBar.playToggle.el());
      // dock.appendChild(player.controlBar.volumePanel.el());


    })
    // Tùy chỉnh tốc độ mặc định
    this.player.playbackRate(1.0);

  }

  ngAfterViewInit(): void {
    this.player.ready(() => {
      if (this.player) {
        // this.adjustControlButtons(false)
      }
    })
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }


  adjustControlButtons(isFullscreen: boolean) {
    const containerEl: any = this.player.el()
    const height = containerEl.offsetHeight - 80;
    const volumePanel = containerEl.querySelector('.vjs-volume-panel') as HTMLElement;
    const fullscreenButton = containerEl.querySelector('.vjs-fullscreen-control') as HTMLElement;
    if (!isFullscreen) {
      console.log('Adjusting control buttons for non-fullscreen mode');
      Object.assign(volumePanel.style, {
        top: `-${height}px`,
        position: 'absolute',
        left: '0',
        zIndex: '1001',
      });
      // volumePanel.style.setProperty('position', 'absolute', 'important');
      Object.assign(fullscreenButton.style, {
        position: 'absolute',
        top: `-${height}px`,
        right: '0',
        zIndex: '1001',
      })
    } else {
      // khi fullscreen thì không cần chỉnh sửa gì cả
      Object.assign(volumePanel.style, {
        top: '0',
        position: 'relative',
        left: '0',
        zIndex: '1001',
      });
      Object.assign(fullscreenButton.style, {
        position: 'relative',
        top: '0',
        right: '0',
        zIndex: '1001',
      })
    }
  }

  playVideo() {

  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

}
