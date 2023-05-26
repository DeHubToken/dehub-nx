import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { PageStreamCollectionService } from '@dehub/angular/core';
import { EnvToken } from '@dehub/angular/model';
import { PageHeaderComponent } from '@dehub/angular/ui/components/page-header/page-header.component';
import { PageSectionsComponent } from '@dehub/angular/ui/components/page-sections/page-sections.component';
import { ContentfulDraftDirective } from '@dehub/angular/ui/directives/contentful-draft/contentful-draft.directive';
import {
  PageStreamFragment,
  SharedEnv,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { WINDOW } from '@ng-web-apis/common';
import { ForModule } from '@rx-angular/template/for';
import { LetModule } from '@rx-angular/template/let';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { Observable, map } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    // Angular
    ForModule,
    NgClass,
    // PrimeNG
    FieldsetModule,
    ButtonModule,
    // UI
    PageHeaderComponent,
    ContentfulDraftDirective,
    PageSectionsComponent,
    // 3rd Party
    LetModule,
  ],
  template: `
    <ng-container *rxLet="pageStream$ as pageStream" class="grid">
      <!-- Titles -->
      <dhb-page-header [page]="pageStream" />

      <!-- Group Posts -->
      <div
        [@fadeInUp]
        class="col-12 sm:col-12 md:col-12 xl:col-6 col-offset-0 xl:col-offset-3 mb-8"
      >
        <p-fieldset
          *rxFor="
            let group of pageStream?.groupsCollection?.items;
            let i = index;
            let isFirst = first
          "
          [toggleable]="group.toggleable!"
          [collapsed]="group.collapsed!"
          [dhbContentfulDraft]="group.sys"
          [classList]="'block bg-gradient-2-propagate'"
          [ngClass]="{
            'border-neon-1-propagate': !group.highlighted,
            'border-neon-2-propagate': group.highlighted,
            'mt-7': !isFirst
          }"
        >
          <ng-template pTemplate="header">
            <i
              class="fa-duotone text-4xl pr-3"
              [class.icon-color-duotone-3]="!group.highlighted"
              [class.icon-color-duotone-4]="group.highlighted"
              [ngClass]="group.icon ? group.icon : 'fa-square-' + (i + 1)"
            ></i>
            <h4 class="inline">{{ group.title }}</h4>
          </ng-template>
          <p class="text-lg">
            {{ group.description }}
          </p>
          <p-button
            (onClick)="onButtonClicked($event, group.externalLink!)"
            [label]="group.label!"
            styleClass="p-button-lg p-button-raised"
          />
        </p-fieldset>
      </div>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageStream?.sectionsCollection?.items"
        [thumbnailPostsResponsiveOptions]="thumbnailPostsResponsiveOptions"
        [path]="path"
      />
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class AngularFeatureStreamComponent implements OnInit {
  pageStream$?: Observable<PageStreamFragment | undefined>;

  path = this.env.baseUrl;

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

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    @Inject(WINDOW) private readonly windowRef: Window,
    private pageStreamCollectionService: PageStreamCollectionService
  ) {}

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

  onButtonClicked(event: Event, externalLink: string) {
    event.preventDefault();
    this.windowRef.open(externalLink, '_blank', 'noopener,noreferrer');
  }
}
