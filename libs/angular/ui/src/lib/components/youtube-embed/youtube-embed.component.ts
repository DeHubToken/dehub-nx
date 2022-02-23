import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

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
  @ViewChild('youTubePlayer') youTubePlayer?: ElementRef<HTMLDivElement>;
  videoWidth?: number;
  videoHeight?: number;
  resizeSub?: Subscription;

  constructor(
    @Inject(WINDOW) readonly windowRef: Window,
    @Inject(DOCUMENT) readonly documentRef: Document,
    public config: DynamicDialogConfig,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!youtubeApiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = this.documentRef.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      this.documentRef.body.appendChild(tag);
      youtubeApiLoaded = true;
    }
  }

  ngAfterViewInit(): void {
    this.onResize();
    this.resizeSub = fromEvent(this.windowRef, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.onResize());
  }

  onResize() {
    if (this.youTubePlayer) {
      // Automatically expand the video to fit the page up to 1200px x 720px
      this.videoWidth = Math.min(
        this.youTubePlayer.nativeElement.clientWidth,
        1200
      );
      this.videoHeight = this.videoWidth * 0.6;
      this.cdRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeSub) {
      this.resizeSub.unsubscribe();
    }
  }
}
