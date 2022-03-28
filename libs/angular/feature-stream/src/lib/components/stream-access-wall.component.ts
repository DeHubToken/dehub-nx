import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken, PageAccessWallCollectionService } from '@dehub/angular/core';
import { BuyDehubFloozComponent } from '@dehub/angular/ui/components/buy-dehub-flooz';
import { SharedEnv } from '@dehub/shared/config';
import { PageAccessWallFragment } from '@dehub/shared/model';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { DialogService } from 'primeng/dynamicdialog';
import { map, Observable } from 'rxjs';

@Component({
  template: `
    <ng-container
      *ngIf="pageStreamAccessWall$ | async as pageStreamAccessWall"
      class="grid"
    >
      <!-- Titles -->
      <dhb-page-header [page]="pageStreamAccessWall"></dhb-page-header>

      <!-- Hardcoded Instructions -->
      <div
        [@fadeInUp]
        class="col-12 sm:col-12 md:col-8 xl:col-8 col-offset-0 sm:col-offset-0 md:col-offset-2 xl:col-offset-2"
      >
        <p-fieldset
          [classList]="'bg-gradient-2-propagate border-neon-1-propagate'"
        >
          <ng-template pTemplate="header">
            <i
              class="fa-duotone fa-square-1 icon-color-duotone-3 text-4xl pr-3"
            ></i>
            <h4 class="inline">Buy DeHub</h4>
          </ng-template>
          <p class="text-lg">
            First you need to own DeHub tokens. Don't worry it's very easy to
            do. Just follow our quidelines here if you're new to this.
          </p>
          <dhb-buy-dehub-button
            [cexUrl]="cexUrl"
            [downloadWalletUrl]="downloadWalletUrl"
            (buy)="onDexSelected()"
            (dexSelected)="onDexSelected()"
          ></dhb-buy-dehub-button>
        </p-fieldset>
      </div>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageStreamAccessWall.sectionsCollection?.items"
        [path]="path"
      ></dhb-page-sections>
    </ng-container>
  `,
  styles: [
    `
      i,
      h4 {
        vertical-align: middle;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class StreamAccessWallComponent implements OnInit {
  pageStreamAccessWall$?: Observable<PageAccessWallFragment | undefined>;

  path = this.env.baseUrl;
  cexUrl = this.env.dehub.cexUrl;
  downloadWalletUrl = this.env.dehub.downloadWalletUrl;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private pageAccessWallCollectionService: PageAccessWallCollectionService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.pageStreamAccessWall$ = this.pageAccessWallCollectionService
      .fetch({
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { pageAccessWallCollection } }) =>
            pageAccessWallCollection?.items[0] ?? undefined
        )
      );
  }

  onDexSelected() {
    this.dialogService.open(BuyDehubFloozComponent, {
      showHeader: true,
      header: 'Decentralised Exchange',
      width: '420px',
      styleClass: 'bg-gradient-3 border-neon-2',
      closeOnEscape: true,
      dismissableMask: true,
    });
  }
}
