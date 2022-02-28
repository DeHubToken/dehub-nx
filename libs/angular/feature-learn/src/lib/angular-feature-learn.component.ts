import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken, PageLearnCollectionService } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import {
  PageLearnFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  template: `
    <ng-container *ngIf="pageLearn$ | async as pageLearn" class="grid">
      <!-- Titles -->
      <div [@bounceInLeft] class="col-12">
        <h3>{{ pageLearn.mainTitle }}</h3>
        <h4>{{ pageLearn.subtitle }}</h4>
      </div>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageLearn.sectionsCollection?.items"
        [featurePostsResponsiveOptions]="featurePostsResponsiveOptions"
        [basicPostsResponsiveOptions]="basicPostsResponsiveOptions"
      ></dhb-page-sections>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' })],
})
export class AngularFeatureLearnComponent implements OnInit {
  pageLearn$?: Observable<PageLearnFragment | undefined>;

  featurePostsResponsiveOptions: SwiperResponsiveOptions[] = [
    {
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
    },
  ];

  basicPostsResponsiveOptions: SwiperResponsiveOptions[] = [
    {
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
    },
  ];

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private pageLearnCollectionService: PageLearnCollectionService
  ) {}

  ngOnInit() {
    this.pageLearn$ = this.pageLearnCollectionService
      .fetch({
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { pageLearnCollection } }) =>
            pageLearnCollection?.items[0] ?? undefined
        )
      );
  }
}
