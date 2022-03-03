import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { GrandPostFragment } from '@dehub/shared/model';
import { WINDOW } from '@ng-web-apis/common';
import { DialogService } from 'primeng/dynamicdialog';
import { YoutubeEmbedComponent } from '../youtube-embed';

@Component({
  selector: 'dhb-grand-post',
  template: `
    <div [dhbContentfulDraft]="grandPost.sys">
      <p-card
        *ngIf="grandPost"
        [header]="grandPost.title ?? ''"
        [subheader]="grandPost.subtitle ?? ''"
        styleClass="grand p-card-shadow h-full border-neon-3"
      >
        <ng-template pTemplate="header">
          <div class="picture-frame">
            <i
              *ngIf="grandPost.videoUrl"
              class="fad fa-play-circle"
              (click)="onVideoPlayClicked()"
            ></i>

            <!-- Picture -->
            <ng-container *ngIf="grandPost.picture as picture">
              <img
                [dhbContentfulDraft]="picture.sys"
                [src]="picture.url"
                [alt]="picture.title"
                [ngClass]="{ hidden: heavyPictureLoaded }"
              />
            </ng-container>

            <!-- Heavy Picture -->
            <ng-container *ngIf="grandPost.heavyPicture as heavyPicture">
              <img
                [dhbContentfulDraft]="heavyPicture.sys"
                [src]="heavyPicture.url"
                [alt]="heavyPicture.title"
                [ngClass]="{ hidden: !heavyPictureLoaded }"
                (load)="heavyPictureLoaded = true"
              />
            </ng-container>
          </div>
        </ng-template>

        <!-- Description -->
        <p>{{ grandPost.description }}</p>

        <ng-template
          *ngIf="grandPost.callToActionButtonLabel && grandPost.callToActionUrl"
          pTemplate="footer"
        >
          <p-button
            [label]="grandPost.callToActionButtonLabel"
            (onClick)="onCTAClicked($event)"
            styleClass="p-button-primary p-button-lg p-button-raised"
          ></p-button>
        </ng-template>
      </p-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrandPostComponent implements OnInit {
  @Input() grandPost!: GrandPostFragment;
  heavyPictureLoaded = false;

  constructor(
    @Inject(WINDOW) readonly windowRef: Window,
    private dialogService: DialogService
  ) {}

  ngOnInit() {}

  onVideoPlayClicked() {
    if (this.grandPost.videoUrl) {
      this.dialogService.open(YoutubeEmbedComponent, {
        data: {
          videoUrl: this.grandPost.videoUrl,
        },
        showHeader: true,
        header: this.grandPost.title,
        width: '80%',
        styleClass: 'bg-gradient-2',
        closeOnEscape: true,
        dismissableMask: true,
      });
    }
  }

  onCTAClicked(event: Event) {
    event.preventDefault();
    if (this.grandPost.callToActionUrl) {
      this.windowRef.open(
        this.grandPost.callToActionUrl,
        '_blank',
        'noopener,noreferrer'
      );
    }
  }
}
