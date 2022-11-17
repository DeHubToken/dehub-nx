import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  PageSectionThumbnailPostsFragment,
  SwiperResponsiveOptions,
  ThumbnailPostFragment,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-thumbnail-posts',
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
      <swiper
        [navigation]="true"
        [breakpoints]="
          section.swiperResponsiveOptions || swiperResponsiveOptions
        "
      >
        <ng-container *ngFor="let thumbnailPost of thumbnailPosts">
          <ng-template swiperSlide>
            <dhb-thumbnail-post
              [thumbnailPost]="thumbnailPost"
            ></dhb-thumbnail-post>
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
export class PageSectionThumbnailPostsComponent implements OnInit {
  @Input() section!: PageSectionThumbnailPostsFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;

  thumbnailPosts: ThumbnailPostFragment[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.thumbnailPosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
