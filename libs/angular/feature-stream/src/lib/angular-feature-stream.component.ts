import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { PageStreamCollectionService } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import {
  PageStreamFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { map, Observable } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="pageStream$ | async as pageStream" class="grid">
      <!-- Titles -->
      <!-- <dhb-page-header [page]="pageStream"></dhb-page-header> -->
      <dhb-page-header-grand></dhb-page-header-grand>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageStream.sectionsCollection?.items"
        [thumbnailPostsResponsiveOptions]="thumbnailPostsResponsiveOptions"
        [path]="path"
      ></dhb-page-sections>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFeatureStreamComponent implements OnInit {
  pageStream$?: Observable<PageStreamFragment | undefined>;

  path = this.env.baseUrl;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private pageStreamCollectionService: PageStreamCollectionService
  ) {}

  thumbnailPostsResponsiveOptions: SwiperResponsiveOptions = {
    '1800': {
      slidesPerView: 7,
      spaceBetween: 20,
    },
    '1440': {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    '860': {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    '320': {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  };

  ngOnInit() {
    this.pageStream$ = this.pageStreamCollectionService
      .fetch({
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { pageStreamCollection } }) =>
            pageStreamCollection?.items[0] ?? undefined
        )
      );
  }
}
