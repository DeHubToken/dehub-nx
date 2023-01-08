import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { PageAccessWallCollectionService } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { PageAccessWallFragment } from '@dehub/shared/model';
import { WINDOW } from '@ng-web-apis/common';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
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
    private pageAccessWallCollectionService: PageAccessWallCollectionService
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

  onButtonClicked(event: Event, externalLink: string) {
    event.preventDefault();
    this.windowRef.open(externalLink, '_blank', 'noopener,noreferrer');
  }
}
