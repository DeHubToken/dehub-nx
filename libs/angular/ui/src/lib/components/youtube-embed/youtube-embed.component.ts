import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

let youtubeApiLoaded = false;

@Component({
  selector: 'dhb-youtube-embed',
  template: `
    <div #youTubePlayer class="text-center">
      <youtube-player
        *ngIf="this.config.data.videoUrl as videoUrl"
        [videoId]="videoUrl | dhbYoutubeVideoId"
        [width]="videoWidth"
        [height]="videoHeight"
        [playerVars]="{ autoplay: 1, rel: 0, showinfo: 0 }"
      ></youtube-player>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YoutubeEmbedComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('youTubePlayer') youTubePlayer:
    | ElementRef<HTMLDivElement>
    | undefined;
  videoWidth: number | undefined;
  videoHeight: number | undefined;

  constructor(
    public config: DynamicDialogConfig,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!youtubeApiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      youtubeApiLoaded = true;
    }
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize = (): void => {
    // Automatically expand the video to fit the page up to 1200px x 720px
    this.videoWidth = Math.min(
      this.youTubePlayer!.nativeElement.clientWidth,
      1200
    );
    this.videoHeight = this.videoWidth * 0.6;
    this.cdRef.detectChanges();
  };

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }
}
