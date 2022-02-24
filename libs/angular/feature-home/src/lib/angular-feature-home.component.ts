import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken, PageHomeCollectionService } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import {
  CarouselResponsiveOptions,
  PageHomeFragment,
} from '@dehub/shared/model';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  template: `
    <ng-container *ngIf="pageHome$ | async as pageHome" class="grid">
      <!-- Titles -->
      <div [@bounceInLeft] class="col-12">
        <h3>{{ pageHome.mainTitle }}</h3>
        <h4>{{ pageHome.subtitle }}</h4>
      </div>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageHome.sectionsCollection?.items"
        [featurePostsResponsiveOptions]="featurePostsResponsiveOptions"
        [basicPostsResponsiveOptions]="basicPostsResponsiveOptions"
      ></dhb-page-sections>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' })],
})
export class AngularFeatureHomeComponent implements OnInit {
  pageHome$?: Observable<PageHomeFragment | undefined>;

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
