import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { PageLearnCollectionService } from '@dehub/angular/core';
import { EnvToken } from '@dehub/angular/model';
import { PageHeaderComponent } from '@dehub/angular/ui/components/page-header/page-header.component';
import { PageSectionsComponent } from '@dehub/angular/ui/components/page-sections/page-sections.component';
import {
  PageLearnFragment,
  SharedEnv,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { LetModule } from '@rx-angular/template/let';
import { map, Observable } from 'rxjs';

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
    <ng-container *rxLet="pageLearn$ as pageLearn" class="grid">
      <!-- Titles -->
      <dhb-page-header [page]="pageLearn"></dhb-page-header>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageLearn?.sectionsCollection?.items"
        [iconTilesResponsiveOptions]="iconTilesResponsiveOptions"
        [path]="path"
      ></dhb-page-sections>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFeatureLearnComponent implements OnInit {
  pageLearn$?: Observable<PageLearnFragment | undefined>;

  path = this.env.baseUrl;

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
