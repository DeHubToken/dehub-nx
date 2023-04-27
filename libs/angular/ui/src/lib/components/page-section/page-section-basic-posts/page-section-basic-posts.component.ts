import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  BasicPostFragment,
  PageSectionBasicPostsFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';
import { BasicPostComponent } from '../../post/basic-post/basic-post.component';

@Component({
  selector: 'dhb-page-section-basic-posts',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgFor,
    // UI
    BasicPostComponent,
    ContentfulDraftDirective,
    // 3rd Party
    SwiperModule,
  ],
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@fadeInUp]
      class="col-12 mb-8"
    >
      <h3 *ngIf="section.title as title">{{ title }}</h3>
      <h5
        *ngIf="section.description as description"
        class="w-full lg:w-8 xl:w-6 mt-0 mb-7 font-normal"
      >
        {{ description }}
      </h5>

      <!-- Basic Posts -->
      <swiper
        [navigation]="true"
        [breakpoints]="
          section.swiperResponsiveOptions || swiperResponsiveOptions
        "
      >
        <ng-container *ngFor="let basicPost of basicPosts">
          <ng-template swiperSlide>
            <dhb-basic-post [basicPost]="basicPost"></dhb-basic-post>
          </ng-template>
        </ng-container>
      </swiper>
    </div>
  `,
  styles: [
    `
      @import 'swiper/scss';
      @import 'dhb_swiper_navigation';
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class PageSectionBasicPostsComponent implements OnInit {
  @Input() section!: PageSectionBasicPostsFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;

  basicPosts: BasicPostFragment[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.basicPosts = [
      ...(this.section.handpickedPostsCollection?.items ?? []),
      ...(this.section.postsByCategory?.linkedFrom?.basicPostCollection
        ?.items ?? []),
    ].filter(isNotNil);
  }
}
