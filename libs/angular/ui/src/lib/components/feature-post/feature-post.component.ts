import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { FeaturePostFragment } from '@dehub/shared/model';
import { WINDOW } from '@ng-web-apis/common';
import { DialogService } from 'primeng/dynamicdialog';
import { YoutubeEmbedComponent } from '../youtube-embed';

@Component({
  selector: 'dhb-feature-post',
  template: `
    <div [dhbContentfulDraft]="featurePost.sys">
      <p-card
        *ngIf="featurePost"
        [header]="featurePost.title ?? ''"
        [subheader]="
          (featurePost.sys.publishedAt | date: 'EEE, MMM d, y, hh:mm:ss zzzz')!
        "
        styleClass="p-card-shadow mx-2 md:mx-3 h-full"
      >
        <ng-template pTemplate="header">
          <div
            *ngIf="featurePost.videoUrl as videoUrl; else showPicture"
            (click)="onVideoFrameClicked()"
            class="video-frame"
          >
            <!-- Video Url -->

            <i class="fad fa-play-circle"></i>
            <img
              [src]="
                'https://i1.ytimg.com/vi/' +
                (videoUrl | dhbYoutubeVideoId) +
                '/hqdefault.jpg'
              "
              alt="Video Cover Image"
              class="video-cover"
            />
          </div>

          <!-- Picture -->
          <ng-template #showPicture>
            <ng-container *ngIf="featurePost.picture as picture">
              <img
                [dhbContentfulDraft]="picture.sys"
                [src]="picture.url"
                [alt]="picture.title"
              />
            </ng-container>
          </ng-template>
        </ng-template>

        <!-- Description -->
        <p>{{ featurePost.description }}</p>

        <ng-template
          *ngIf="
            featurePost.callToActionButtonLabel && featurePost.callToActionUrl
          "
          pTemplate="footer"
        >
          <p-button
            [label]="featurePost.callToActionButtonLabel"
            (onClick)="onCTAClicked($event)"
            styleClass="p-button-primary p-button-lg p-button-raised"
          ></p-button>
        </ng-template>
      </p-card>
    </div>
  `,
  styles: [
    `
      .video-frame {
        overflow: hidden;
        position: relative;
        cursor: pointer;
      }
      .video-cover {
        margin: -9.3% 0 -10.5% 0;
      }
      .fa-play-circle {
        font-size: 5em;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-shadow: 4px 2px 4px rgb(0 0 0 / 75%);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturePostComponent implements OnInit {
  @Input() featurePost!: FeaturePostFragment;

  constructor(
    @Inject(WINDOW) readonly windowRef: Window,
    private dialogService: DialogService
  ) {}

  ngOnInit() {}

  onVideoFrameClicked() {
    if (this.featurePost.videoUrl) {
      this.dialogService.open(YoutubeEmbedComponent, {
        data: {
          videoUrl: this.featurePost.videoUrl,
        },
        showHeader: true,
        header: this.featurePost.title,
        width: '80%',
        styleClass: 'bg-gradient-2',
        closeOnEscape: true,
        dismissableMask: true,
      });
    }
  }

  onCTAClicked(event: Event) {
    event.preventDefault();
    if (this.featurePost.callToActionUrl) {
      this.windowRef.open(
        this.featurePost.callToActionUrl,
        '_blank',
        'noopener,noreferrer'
      );
    }
  }
}
