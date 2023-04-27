import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { PageNewsCollectionService } from '@dehub/angular/core';
import { EnvToken } from '@dehub/angular/model';
import { PageHeaderComponent } from '@dehub/angular/ui/components/page-header/page-header.component';
import { PageSectionsComponent } from '@dehub/angular/ui/components/page-sections/page-sections.component';
import {
  PageNewsFragment,
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
    <ng-container *rxLet="pageNews$ as pageNews" class="grid">
      <!-- Titles -->
      <dhb-page-header [page]="pageNews"></dhb-page-header>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageNews?.sectionsCollection?.items"
        [basicPostsResponsiveOptions]="basicPostsResponsiveOptions"
        [path]="path"
      ></dhb-page-sections>
    </ng-container>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFeatureNewsComponent implements OnInit {
  pageNews$?: Observable<PageNewsFragment | undefined>;

  path = this.env.baseUrl;

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

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private pageNewsCollectionService: PageNewsCollectionService
  ) {}

  ngOnInit() {
    this.pageNews$ = this.pageNewsCollectionService
      .fetch({
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { pageNewsCollection } }) =>
            pageNewsCollection?.items[0] ?? undefined
        )
      );
  }
}
