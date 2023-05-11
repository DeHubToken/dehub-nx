import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
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
import { Navigation, SwiperOptions } from 'swiper';

import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';
import { SwiperDirective } from '../../../directives/swiper/swiper.directive';
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
        <swiper-slide *ngFor="let thumbnailPost of thumbnailPosts">
          <dhb-thumbnail-post
            [thumbnailPost]="thumbnailPost"
          ></dhb-thumbnail-post>
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
export class PageSectionThumbnailPostsComponent implements OnInit {
  @Input() section!: PageSectionThumbnailPostsFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;

  thumbnailPosts: ThumbnailPostFragment[] = [];

  swiperOptions?: SwiperOptions;

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.swiperOptions = {
      modules: [Navigation],
      navigation: true,
      breakpoints:
        this.section.swiperResponsiveOptions || this.swiperResponsiveOptions,
    };

    this.thumbnailPosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
