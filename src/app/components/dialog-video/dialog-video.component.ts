import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Player from 'video.js/dist/types/player';
import videojs from 'video.js';
import "videojs-hotkeys";

@Component({
  selector: 'app-dialog-video',
  imports: [],
  templateUrl: './dialog-video.component.html',
  styleUrl: './dialog-video.component.scss'
})
export class DialogVideoComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('target', {static: true}) target!: ElementRef;
  @Input() videoSrc!: string;
  @Input() aspectRatio!: string
  player!: Player;
  videoVisible = false;
  private previousScrollTop: number = 0;
  isExpanded = false;
  

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

    this.player.ready(() => {
      // this.player.play();
    })
    // Tùy chỉnh tốc độ mặc định
    this.player.playbackRate(1.0);

  }

  ngAfterViewInit(): void {
    this.player.ready(() => {
      if (this.player) {
        this.adjustControlButtons(false)
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

}
