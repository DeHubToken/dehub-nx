import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { PageAccessWallCollectionService } from '@dehub/angular/core';
import { EnvToken } from '@dehub/angular/model';
import { BuyDehubFloozComponent } from '@dehub/angular/ui/components/buy-dehub-flooz';
import { SharedEnv } from '@dehub/shared/config';
import { PageAccessWallFragment } from '@dehub/shared/model';
import { WINDOW } from '@ng-web-apis/common';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { DialogService } from 'primeng/dynamicdialog';
import { map, Observable } from 'rxjs';

@Component({
  templateUrl: './stream-access-wall.component.html',
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
    @Inject(WINDOW) private readonly windowRef: Window,
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

  onWatchClicked(event: Event) {
    event.preventDefault();
    this.windowRef.open(this.env.dehub.stream, '_blank', 'noopener,noreferrer');
  }

  onStakeDeHubClicked(event: Event) {
    event.preventDefault();
    this.windowRef.open(
      this.env.dehub.dapps.staking,
      '_blank',
      'noopener,noreferrer'
    );
  }
}
