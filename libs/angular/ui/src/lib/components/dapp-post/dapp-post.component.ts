import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { DappPostFragment } from '@dehub/shared/model';
import { WINDOW } from '@ng-web-apis/common';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { NgIf } from '@angular/common';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';

@Component({
    selector: 'dhb-dapp-post',
    template: `
    <div [dhbContentfulDraft]="dappPost.sys">
      <p-card
        *ngIf="dappPost"
        [header]="dappPost.title ?? ''"
        styleClass="dapp p-card-shadow h-full border-neon-1 border-round"
      >
        <ng-template pTemplate="header">
          <div
            class="card bg-gradient-3 shadow-8 text-center px-5 pt-6 pb-7 w-full"
          >
            <!-- Icon -->
            <i [class]="dappPost.icon + ' icon-color-duotone-1 text-6xl'"></i>

            <!-- Icon Title -->
            <h3 class="pt-2">{{ dappPost.iconTitle }}</h3>
          </div>
        </ng-template>

        <!-- Description -->
        <p>{{ dappPost.description }}</p>

        <ng-template
          *ngIf="dappPost.urlToLearnMore || dappPost.urlToDapp"
          pTemplate="footer"
        >
          <p-button
            *ngIf="dappPost.urlToLearnMore as urlLearnMore"
            label="Learn More"
            (onClick)="onLearnMoreClicked($event)"
            styleClass="p-button-secondary p-button-lg p-button-raised mr-3"
          ></p-button>
          <p-button
            *ngIf="dappPost.urlToDapp as urlDapp"
            label="Open D'App"
            (onClick)="onDappClicked($event)"
            styleClass="p-button-primary p-button-lg p-button-raised"
          ></p-button>
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
    standalone: true,
    imports: [ContentfulDraftDirective, NgIf, CardModule, SharedModule, ButtonModule]
})
export class DappPostComponent implements OnInit {
  @Input() dappPost!: DappPostFragment;

  constructor(@Inject(WINDOW) private readonly windowRef: Window) {}

  ngOnInit(): void {}

  onLearnMoreClicked(event: Event) {
    event.preventDefault();
    if (this.dappPost.urlToLearnMore) {
      this.windowRef.open(
        this.dappPost.urlToLearnMore,
        '_blank',
        'noopener,noreferrer'
      );
    }
  }

  onDappClicked(event: Event) {
    event.preventDefault();
    if (this.dappPost.urlToDapp) {
      this.windowRef.open(
        this.dappPost.urlToDapp,
        '_blank',
        'noopener,noreferrer'
      );
    }
  }
}
