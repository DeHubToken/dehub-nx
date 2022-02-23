import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { YoutubeEmbedComponent } from '@dehub/angular/ui/components/youtube-embed';
import { FeaturePostFragment } from '@dehub/shared/model';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'dhb-page-section-feature-post',
  template: `
    <p-card
      *ngIf="featurePost"
      [dhbContentfulDraft]="featurePost.sys"
      header="{{ featurePost.title }}"
      subheader="{{
        featurePost.sys.publishedAt | date: 'EEE, MMM d, y, hh:mm:ss zzzz'
      }}"
      styleClass="p-card-shadow m-3"
    >
      <ng-template pTemplate="header">
        <div class="frame" (click)="onPlayClicked()">
          <i class="fad fa-play-circle"></i>
          <!-- Video Url -->
          <ng-container
            *ngIf="featurePost.videoUrl as videoUrl; else showPicture"
          >
            <img
              class="video-cover"
              [src]="
                'https://i1.ytimg.com/vi/' +
                (videoUrl | dhbYoutubeVideoId) +
                '/hqdefault.jpg'
              "
              alt="Video Cover Image"
            />
          </ng-container>

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
        </div>
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
          label="{{ featurePost.callToActionButtonLabel }}"
          styleClass="p-button-primary"
          (onClick)="onCTAClicked($event)"
        ></p-button>
      </ng-template>
    </p-card>
  `,
  styles: [
    `
      .frame {
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
export class PageSectionFeaturePostComponent implements OnInit {
  @Input() featurePost!: FeaturePostFragment;

  constructor(private dialogService: DialogService) {}

  ngOnInit() {}

  onPlayClicked() {
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
      window.open(this.featurePost.callToActionUrl);
    }
  }
}
