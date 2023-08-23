import { NgFor, NgIf } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { trackByContentfulIdFn } from '@dehub/angular/util';
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
import { SwiperVisibleImagesPipe } from '../../../pipes/swiper-visible-images/swiper-visible-images.pipe';
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
    SwiperVisibleImagesPipe,
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
        <swiper-slide
          *ngFor="
            let featurePost of featurePosts;
            let i = index;
            trackBy: trackByFn
          "
        >
          <dhb-feature-post
            [featurePost]="featurePost"
            [numOfVisibleImages]="numOfVisibleImages"
            [priorityImage]="
              i | dhbSwiperImagePriority : swiperOptions?.breakpoints
            "
            [@fadeInUp]="{ value: '', params: { delay: i * 100 } }"
          />
        </swiper-slide>
      </swiper-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class PageSectionFeaturePostsComponent implements OnInit {
  @Input() section!: PageSectionFeaturePostsFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;

  featurePosts: FeaturePostFragment[] = [];

  swiperOptions?: SwiperOptions;

  trackByFn = trackByContentfulIdFn<FeaturePostFragment>();

  numOfVisibleImages = 1;

  constructor(private pipe: SwiperImagePriorityPipe) {}

  ngOnInit() {
    if (!this.section) return;

    const breakpoints =
      this.section.swiperResponsiveOptions || this.swiperResponsiveOptions;

    this.numOfVisibleImages = this.pipe.numOfVisibleImages(breakpoints);

    this.swiperOptions = {
      navigation: true,
      breakpoints,
    };

    this.featurePosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
