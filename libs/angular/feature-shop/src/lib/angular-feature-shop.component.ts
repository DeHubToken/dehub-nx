import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { PageShopCollectionService } from '@dehub/angular/core';
import { EnvToken } from '@dehub/angular/model';
import { PageHeaderComponent } from '@dehub/angular/ui/components/page-header/page-header.component';
import { PageSectionsComponent } from '@dehub/angular/ui/components/page-sections/page-sections.component';
import {
  PageShopFragment,
  SharedEnv,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { publishReplayRefCount } from '@dehub/shared/utils';
import { LetModule } from '@rx-angular/template/let';
import { MenuItem } from 'primeng/api';
import { Observable, filter, map } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    // UI
    PageHeaderComponent,
    PageSectionsComponent,
    // 3rd Party
    LetModule,
  ],
  template: `
    <ng-container *rxLet="pageShop$ as pageShop" class="grid">
      <!-- Titles -->
      <dhb-page-header [page]="pageShop" />

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageShop?.sectionsCollection?.items"
        [featurePostsResponsiveOptions]="featurePostsResponsiveOptions"
        [thumbnailPostsResponsiveOptions]="thumbnailPostsResponsiveOptions"
        [basicPostsResponsiveOptions]="basicPostsResponsiveOptions"
        [iconTilesResponsiveOptions]="iconTilesResponsiveOptions"
        [productsResponsiveOptions]="productsResponsiveOptions"
        [path]="path"
      />
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  }
}
