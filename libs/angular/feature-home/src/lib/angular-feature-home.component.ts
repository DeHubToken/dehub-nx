import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken, PageHomeCollectionService } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import { PageHomeFragment, SwiperResponsiveOptions } from '@dehub/shared/model';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  template: `
    <ng-container *ngIf="pageHome$ | async as pageHome" class="grid">
      <!-- Titles -->
      <dhb-page-header [page]="pageHome"></dhb-page-header>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageHome.sectionsCollection?.items"
        [featurePostsResponsiveOptions]="featurePostsResponsiveOptions"
        [thumbnailPostsResponsiveOptions]="thumbnailPostsResponsiveOptions"
        [basicPostsResponsiveOptions]="basicPostsResponsiveOptions"
        [iconTilesResponsiveOptions]="iconTilesResponsiveOptions"
        [path]="path"
      ></dhb-page-sections>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' })],
})
export class AngularFeatureHomeComponent implements OnInit {
  pageHome$?: Observable<PageHomeFragment | undefined>;

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

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private pageHomeCollectionService: PageHomeCollectionService
  ) {}

  ngOnInit() {
    this.pageHome$ = this.pageHomeCollectionService
      .fetch({
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { pageHomeCollection } }) =>
            pageHomeCollection?.items[0] ?? undefined
        )
      );
  }
}
