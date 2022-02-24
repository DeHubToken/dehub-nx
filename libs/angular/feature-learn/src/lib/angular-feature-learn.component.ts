import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken, PageLearnCollectionService } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import {
  CarouselResponsiveOptions,
  PageLearnFragment,
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

  featurePostsResponsiveOptions: CarouselResponsiveOptions = [
    {
      breakpoint: '1290px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '960px',
      numVisible: 1.15,
      numScroll: 1.15,
    },
  ];

  basicPostsResponsiveOptions: CarouselResponsiveOptions = [
    {
      breakpoint: '1570px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '960px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '700px',
      numVisible: 1.15,
      numScroll: 1.15,
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
