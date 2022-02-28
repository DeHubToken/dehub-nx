import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { EnvToken, PageStreamCollectionService } from '@dehub/angular/core';
import { SharedEnv } from '@dehub/shared/config';
import {
  PageStreamFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';
import { map, Observable } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="pageStream$ | async as pageStream" class="grid">
      <!-- Titles -->
      <div [@bounceInLeft] class="col-12">
        <h1>{{ pageStream.mainTitle }}</h1>
        <h5 class="mt-1">{{ pageStream.subtitle }}</h5>
      </div>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageStream.sectionsCollection?.items"
        [thumbnailPostsResponsiveOptions]="thumbnailPostsResponsiveOptions"
      ></dhb-page-sections>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' })],
})
export class AngularFeatureStreamComponent implements OnInit {
  pageStream$?: Observable<PageStreamFragment | undefined>;

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
