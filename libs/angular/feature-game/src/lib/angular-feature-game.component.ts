import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken, PageGameCollectionService } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import { PageGameFragment } from '@dehub/shared/model';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';
import { map, Observable } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="pageGame$ | async as pageGame" class="grid">
      <!-- Titles -->
      <dhb-page-header [page]="pageGame"></dhb-page-header>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageGame.sectionsCollection?.items"
        [path]="path"
      ></dhb-page-sections>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' })],
})
export class AngularFeatureGameComponent implements OnInit {
  pageGame$?: Observable<PageGameFragment | undefined>;

  path = this.env.baseUrl;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private pageGameCollectionService: PageGameCollectionService
  ) {}

  ngOnInit() {
    this.pageGame$ = this.pageGameCollectionService
      .fetch({
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { pageGameCollection } }) =>
            pageGameCollection?.items[0] ?? undefined
        )
      );
  }
}
