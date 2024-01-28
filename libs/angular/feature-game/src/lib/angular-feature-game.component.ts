import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { PageGameCollectionService } from '@dehub/angular/core';
import { EnvToken } from '@dehub/angular/model';
import { PageHeaderComponent } from '@dehub/angular/ui/components/page-header/page-header.component';
import { PageSectionsComponent } from '@dehub/angular/ui/components/page-sections/page-sections.component';
import {
  PageGameFragment,
  SharedEnv,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { LetModule } from '@rx-angular/template/let';
import { Observable, map } from 'rxjs';
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
    <ng-container *rxLet="pageGame$ as pageGame" class="grid">
      <!-- Titles -->
      <dhb-page-header [page]="pageGame" />

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageGame?.sectionsCollection?.items"
        [wideFeaturePosts]="true"
        [grandPostsResponsiveOptions]="grandPostsResponsiveOptions"
        [path]="path"
      />
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AngularFeatureGameComponent implements OnInit {
  pageGame$?: Observable<PageGameFragment | undefined>;

  path = this.env.baseUrl;

  grandPostsResponsiveOptions: SwiperResponsiveOptions = {
    '1800': {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    '1440': {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    '1250': {
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
