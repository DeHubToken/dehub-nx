import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { TournamentFragment } from '@dehub/shared/model';
import { WINDOW } from '@ng-web-apis/common';
@Component({
  selector: 'dhb-tournament-card',
  template: `
    <ng-container *ngIf="tournament">
      <div [dhbContentfulDraft]="tournament.sys" class="border-round m-2">
        <!-- Cover Image -->
        <div *ngIf="tournament.coverImage as coverImage" class="mb-4">
          <img
            [dhbContentfulDraft]="coverImage.sys"
            [src]="coverImage.url"
            [alt]="tournament.title"
            class="w-full"
          />
        </div>

        <div class="px-4">
          <!-- Title -->
          <h4 class="mb-1">{{ tournament.title }}</h4>

          <!-- Date -->
          <div class="mb-4">
            <i class="fa fa-calendar-alt"></i>
            {{ tournament.date | date: 'EEE, MMM d, y, hh:mm:ss zzzz' }}
          </div>

          <!-- Count Down -->
          <div *ngIf="!expired" class="mb-4">
            <dhb-count-down
              [countDownDateStr]="tournament.date"
            ></dhb-count-down>
          </div>

          <!-- Badge -->
          <div class="mb-4">
            <dhb-tournament-badge
              [tournament]="tournament"
              [expired]="expired"
            ></dhb-tournament-badge>
          </div>

          <!-- Actions -->
          <div *ngIf="!expired" class="mb-4 grid">
            <!-- Show Rules -->
            <p-button
              *ngIf="tournament.description?.json"
              (onClick)="readTheRules(tournament)"
              label="Read the Rules"
              icon="fa fa-arrows-v"
              iconPos="left"
              class="mr-2 mb-2"
            ></p-button>

            <!-- Rules Dialog -->
            <p-dialog
              [header]="tournament.title + ' Rules'"
              [visible]="showRules"
              [modal]="true"
              [closable]="false"
              [breakpoints]="{ '960px': '75vw', '640px': '100vw' }"
              [style]="{ width: '50vw' }"
              showEffect="fade"
              appendTo="body"
            >
              <div
                [innerHtml]="rules | dhbSafeHtml"
                class="line-height-3"
              ></div>
              <p-footer>
                <button
                  type="button"
                  pButton
                  (click)="showRules = false"
                  label="Close"
                  class="p-button-text"
                  icon="fa fa-check"
                ></button>
              </p-footer>
            </p-dialog>

            <!-- Register -->
            <p-button
              *ngIf="
                tournament.callToActionButtonLabel &&
                tournament.callToActionButtonLink
              "
              [label]="tournament.callToActionButtonLabel"
              (onClick)="openCallToAction(tournament.callToActionButtonLink)"
              icon="fa fa-pen"
              iconPos="left"
              class="mr-2 mb-2"
            ></p-button>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentCardComponent implements OnInit {
  @Input() tournament?: TournamentFragment;

  expired = false;
  showRules = false;
  rules = '';

  constructor(@Inject(WINDOW) readonly windowRef: Window) {}

  ngOnInit() {
    if (!this.tournament) return;

    const { date } = this.tournament;

    this.expired =
      date === undefined || (date !== undefined && new Date(date) < new Date());
  }

  openCallToAction(link: string) {
    this.windowRef.open(link, '_blank', 'noopener,noreferrer');
  }

  readTheRules({ description }: TournamentFragment) {
    const richOptions: Options = {
      renderNode: {
        [BLOCKS.HEADING_5]: (node, next) => `<h5>${next(node.content)}</h5>`,
        [BLOCKS.HEADING_6]: (node, next) => `<h6>${next(node.content)}</h6>`,
        [BLOCKS.UL_LIST]: (node, next) => `<ul>${next(node.content)}</ul>`,
        [BLOCKS.OL_LIST]: (node, next) => `<ol>${next(node.content)}</ol>`,
        [BLOCKS.LIST_ITEM]: (node, next) => `<li>${next(node.content)}</li>`,
      },
    };
    this.rules = documentToHtmlString(description?.json, richOptions);
    this.showRules = true;
  }
}
