import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import {
  FeaturePostFragment,
  PageSectionFeaturePostsFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { SwiperOptions } from 'swiper';
import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';
import { SwiperDirective } from '../../../directives/swiper/swiper.directive';
import { FeaturePostComponent } from '../../post/feature-post/feature-post.component';

@Component({
  selector: 'dhb-page-section-feature-posts',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgFor,
    // UI
    ContentfulDraftDirective,
    FeaturePostComponent,
    SwiperDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@fadeInUp]
      class="col-12 mb-5"
    >
      <h3 *ngIf="section.title as title">{{ title }}</h3>
      <h5
        *ngIf="section.description as description"
        class="w-full lg:w-8 xl:w-6 mt-0 mb-7 font-normal"
      >
        {{ description }}
      </h5>

      <!-- Feature Posts -->
      <swiper-container dhbSwiper [swiperOptions]="swiperOptions" init="false">
        <swiper-slide *ngFor="let featurePost of featurePosts">
          <dhb-feature-post [featurePost]="featurePost"></dhb-feature-post>
        </swiper-slide>
      </swiper-container>
    </div>
  `,
  styles: [
    `
      @import 'dhb_swiper_navigation';
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class PageSectionFeaturePostsComponent implements OnInit {
  @Input() section!: PageSectionFeaturePostsFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;

  featurePosts: FeaturePostFragment[] = [];

  swiperOptions?: SwiperOptions;

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.swiperOptions = {
      navigation: true,
      breakpoints:
        this.section.swiperResponsiveOptions || this.swiperResponsiveOptions,
    };

    this.featurePosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
