import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { PageShopCollectionService } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { PageShopFragment, SwiperResponsiveOptions } from '@dehub/shared/model';
import { map, Observable } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="pageShop$ | async as pageShop" class="grid">
      <!-- Titles -->
      <dhb-page-header [page]="pageShop"></dhb-page-header>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageShop.sectionsCollection?.items"
        [featurePostsResponsiveOptions]="featurePostsResponsiveOptions"
        [thumbnailPostsResponsiveOptions]="thumbnailPostsResponsiveOptions"
        [basicPostsResponsiveOptions]="basicPostsResponsiveOptions"
        [iconTilesResponsiveOptions]="iconTilesResponsiveOptions"
        [productsResponsiveOptions]="productsResponsiveOptions"
        [path]="path"
      ></dhb-page-sections>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFeatureShopComponent implements OnInit {
  pageShop$?: Observable<PageShopFragment | undefined>;

  path = this.env.baseUrl;

  featurePostsResponsiveOptions: SwiperResponsiveOptions = {
    '1800': {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    '1250': {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    '320': {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  };

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

  basicPostsResponsiveOptions: SwiperResponsiveOptions = {
    '1900': {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    '1700': {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    '1350': {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    '960': {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    '750': {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    '320': {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  };

  iconTilesResponsiveOptions: SwiperResponsiveOptions = {
    '1800': {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    '1440': {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    '860': {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    '320': {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  };

  productsResponsiveOptions: SwiperResponsiveOptions = {
    '1900': {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    '1700': {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    '1350': {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    '960': {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    '750': {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    '320': {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  };

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private pageShopCollectionService: PageShopCollectionService
  ) {}

  ngOnInit() {
    this.pageShop$ = this.pageShopCollectionService
      .fetch({
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { pageShopCollection } }) =>
            pageShopCollection?.items[0] ?? undefined
        )
      );
  }
}
