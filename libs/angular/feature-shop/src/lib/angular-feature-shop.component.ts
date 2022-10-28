import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { PageShopCollectionService } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import {
  PageSectionProductsFragment,
  PageShopFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { filterNil, publishReplayRefCount } from '@dehub/shared/utils';
import { fadeInDownOnEnterAnimation } from 'angular-animations';
import { MenuItem } from 'primeng/api';
import { filter, map, Observable } from 'rxjs';

@Component({
  template: `
    <ng-container *rxLet="pageShop$ as pageShop" class="grid">
      <!-- Titles -->
      <dhb-page-header [page]="pageShop"></dhb-page-header>

      <!-- Categories links -->
      <div [@fadeInDown] class="py-0">
        <dhb-tab-menu
          [menuItems]="tabMenuItems$ | push"
          [activeMenuItem]="activeMenuItem$ | push"
        ></dhb-tab-menu>
      </div>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageShop?.sectionsCollection?.items"
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
  animations: [
    fadeInDownOnEnterAnimation({ anchor: 'fadeInDown', delay: 1000 }),
  ],
})
export class AngularFeatureShopComponent implements OnInit {
  pageShop$?: Observable<PageShopFragment | undefined>;

  path = this.env.baseUrl;

  tabMenuItems$?: Observable<MenuItem[]>;
  activeMenuItem$?: Observable<MenuItem>;

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
      slidesPerView: 4,
      spaceBetween: 20,
    },
    '1350': {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    '960': {
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
      .watch({
        isPreview: this.env.contentful.isPreview,
      })
      .valueChanges.pipe(
        filter(({ loading }) => !loading),
        map(
          ({ data: { pageShopCollection } }) =>
            pageShopCollection?.items[0] ?? undefined
        ),
        publishReplayRefCount()
      );

    this.tabMenuItems$ = this.pageShop$.pipe(
      filterNil(),
      map(pageShop => pageShop.sectionsCollection?.items),
      filterNil(),
      map(
        pageSections =>
          // Keep only product sections
          pageSections.filter(
            pageSection =>
              !!pageSection && pageSection.__typename === 'PageSectionProducts'
          ) as PageSectionProductsFragment[]
      ),
      map(productSections =>
        productSections.map(productSection => ({
          label: productSection.title,
          icon:
            productSection.handpickedProductsCollection?.items[0]?.category
              ?.icon ?? productSection.productsByCategory?.icon,
          fragment: productSection.sys.id,
          routerLink: ['.'],
        }))
      )
    );

    this.activeMenuItem$ = this.tabMenuItems$.pipe(map(items => items[0]));
  }
}
