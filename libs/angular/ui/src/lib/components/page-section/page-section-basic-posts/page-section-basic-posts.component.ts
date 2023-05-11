import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import {
  BasicPostFragment,
  PageSectionBasicPostsFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { Navigation, Pagination, SwiperOptions } from 'swiper';
import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';
import { SwiperDirective } from '../../../directives/swiper/swiper.directive';
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
    SwiperDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
      <swiper-container dhbSwiper [swiperOptions]="swiperOptions" init="false">
        <swiper-slide *ngFor="let basicPost of basicPosts">
          <dhb-basic-post [basicPost]="basicPost"></dhb-basic-post>
        </swiper-slide>
      </swiper-container>
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->
    </div>
  `,
  styles: [
    `
      /* @import 'swiper/scss'; */
      @import 'dhb_swiper_navigation';
    `,
  ],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class PageSectionBasicPostsComponent implements OnInit {
  @Input() section!: PageSectionBasicPostsFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;

  basicPosts: BasicPostFragment[] = [];

  swiperOptions?: SwiperOptions;

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.swiperOptions = {
      modules: [Pagination, Navigation],
      navigation: true,
      // navigation: {
      //   enabled: true,
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
      breakpoints:
        this.section.swiperResponsiveOptions || this.swiperResponsiveOptions,
      // injectStyles: [
      //   `
      // .swiper {
      //   padding: 0 0 60px 0 !important;
      // }

      // .swiper-slide {
      //   /* Stretch slide vertically */
      //   display: -webkit-box !important;
      //   display: -ms-flexbox !important;
      //   display: -webkit-flex !important;
      //   display: flex !important;
      //   -webkit-box-pack: center !important;
      //   -ms-flex-pack: center !important;
      //   -webkit-justify-content: center !important;
      //   justify-content: center !important;
      //   -webkit-box-align: stretch !important;
      //   -ms-flex-align: stretch !important;
      //   -webkit-align-items: stretch !important;
      //   align-items: stretch !important;
      //   height: auto !important;
      //   flex-direction: column !important;
      // }

      // :root {
      //   --swiper-theme-color: #fafafa !important;
      // }
      // .swiper-button-prev {
      //   background-image: url('icons/prev.svg') !important;
      //   background-repeat: no-repeat !important;
      //   background-size: 100% auto !important;
      //   background-position: center !important;
      //   width: 40px !important;
      //   height: 40px !important;
      //   top: auto !important;
      //   bottom: 0px !important;
      //   right: 60px !important;
      //   left: auto !important;

      //   &:after {
      //     display: none !important;
      //   }
      // }
      // .swiper-button-next {
      //   background-image: url('icons/next.svg') !important;
      //   background-repeat: no-repeat !important;
      //   background-size: 100% auto !important;
      //   background-position: center !important;
      //   width: 40px !important;
      //   height: 40px !important;
      //   top: auto !important;
      //   bottom: 0px !important;

      //   &:after {
      //     display: none !important;
      //   }
      // }

      // `,
      // ],
    };

    this.basicPosts = [
      ...(this.section.handpickedPostsCollection?.items ?? []),
      ...(this.section.postsByCategory?.linkedFrom?.basicPostCollection
        ?.items ?? []),
    ].filter(isNotNil);
  }
}
