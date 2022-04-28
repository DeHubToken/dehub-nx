import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { PageGameCollectionService } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { PageGameFragment, SwiperResponsiveOptions } from '@dehub/shared/model';
import { map, Observable } from 'rxjs';
@Component({
  template: `
    <ng-container *ngIf="pageGame$ | async as pageGame" class="grid">
      <!-- Titles -->
      <dhb-page-header [page]="pageGame"></dhb-page-header>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageGame.sectionsCollection?.items"
        [grandPostsResponsiveOptions]="grandPostsResponsiveOptions"
        [path]="path"
      ></dhb-page-sections>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFeatureGameComponent implements OnInit {
  pageGame$?: Observable<PageGameFragment | undefined>;

  path = this.env.baseUrl;

  grandPostsResponsiveOptions: SwiperResponsiveOptions = {
    '1800': {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    '1440': {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    '860': {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    '320': {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  };

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
