import { NgFor, NgIf } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  PageSectionThumbnailPostsFragment,
  SwiperResponsiveOptions,
  ThumbnailPostFragment,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { SwiperOptions } from 'swiper';

import { trackByContentfulIdFn } from '@dehub/angular/util';
import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';
import { SwiperDirective } from '../../../directives/swiper/swiper.directive';
import { SwiperVisibleImagesPipe } from '../../../pipes/swiper-visible-images/swiper-visible-images.pipe';
import { ThumbnailPostComponent } from '../../post/thumbnail-post/thumbnail-post.component';
@Component({
  selector: 'dhb-page-section-thumbnail-posts',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgFor,
    // UI
    ContentfulDraftDirective,
    ThumbnailPostComponent,
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

      <!-- Thumbnail Posts -->
      <swiper-container dhbSwiper [swiperOptions]="swiperOptions" init="false">
        <swiper-slide
          *ngFor="
            let thumbnailPost of thumbnailPosts;
            let i = index;
            trackBy: trackByFn
          "
        >
          <dhb-thumbnail-post
            [thumbnailPost]="thumbnailPost"
            [priorityImage]="
              swiperOptions?.breakpoints
                ? i < (swiperOptions?.breakpoints | dhbSwiperVisibleImages)
                : false
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
export class PageSectionThumbnailPostsComponent implements OnInit {
  @Input() section!: PageSectionThumbnailPostsFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;

  thumbnailPosts: ThumbnailPostFragment[] = [];

  swiperOptions?: SwiperOptions;

  trackByFn = trackByContentfulIdFn<ThumbnailPostFragment>();

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.swiperOptions = {
      navigation: true,
      breakpoints:
        this.section.swiperResponsiveOptions || this.swiperResponsiveOptions,
    };

    this.thumbnailPosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
