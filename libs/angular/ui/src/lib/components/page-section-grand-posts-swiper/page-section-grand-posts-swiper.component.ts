import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  GrandPostFragment,
  PageSectionGrandPostsFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-grand-posts-swiper',
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

      <!-- Grand Posts -->
      <swiper
        [navigation]="true"
        [breakpoints]="
          section.swiperResponsiveOptions || swiperResponsiveOptions
        "
        class="px-3"
      >
        <ng-container *ngFor="let grandPost of grandPosts">
          <ng-template swiperSlide>
            <dhb-grand-post
              [grandPost]="grandPost"
              class="flex-grow-1"
            ></dhb-grand-post>
          </ng-template>
        </ng-container>
      </swiper>
    </div>
  `,
  styles: [
    `
      @import '~swiper/scss';
      @import '~@dehub/swiper/dhb_swiper_navigation';
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class PageSectionGrandPostsSwiperComponent implements OnInit {
  @Input() section!: PageSectionGrandPostsFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;

  grandPosts: GrandPostFragment[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.grandPosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
