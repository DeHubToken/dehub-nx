import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { GrandPostFragment } from '@dehub/shared/model';
import { WINDOW } from '@ng-web-apis/common';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { HeavyPictureComponent } from '../../heavy-picture/heavy-picture.component';
import { YoutubeEmbedComponent } from '../../youtube-embed/youtube-embed.component';

import { NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';

@Component({
  selector: 'dhb-grand-post',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    // PrimeNG
    ButtonModule,
    CardModule,
    // UI
    HeavyPictureComponent,
    ContentfulDraftDirective,
  ],
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
            <dhb-heavy-picture [container]="grandPost" />
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
          />
        </ng-template>
      </p-card>
    </div>
  `,
  styles: [
    `
      /* Important for keeping all items stretched to same height */
      :host {
        height: 100%;
        & > div {
          height: 100%;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrandPostComponent implements OnInit {
  @Input() grandPost!: GrandPostFragment;

  constructor(
    @Inject(WINDOW) private readonly windowRef: Window,
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
