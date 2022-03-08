import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  PageSectionPersonPostsFragment,
  PersonPostFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/util';
import { bounceInRightOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-person-posts-swiper',
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@bounceInRight]
      class="col-12 mb-8"
    >
      <h3 *ngIf="section.title as title">{{ title }}</h3>
      <h5
        *ngIf="section.description as description"
        class="w-full lg:w-8 xl:w-6 mt-0 mb-7 font-normal"
      >
        {{ description }}
      </h5>

      <!-- Person Posts -->
      <swiper
        [navigation]="true"
        [breakpoints]="
          section.swiperResponsiveOptions || swiperResponsiveOptions
        "
        class="px-3"
      >
        <ng-container *ngFor="let personPost of personPosts">
          <ng-template swiperSlide>
            <dhb-person-post
              [personPost]="personPost"
              class="flex-grow-1"
            ></dhb-person-post>
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
  animations: [bounceInRightOnEnterAnimation({ anchor: 'bounceInRight' })],
})
export class PageSectionPersonPostsSwiperComponent implements OnInit {
  @Input() section!: PageSectionPersonPostsFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;

  personPosts: PersonPostFragment[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.personPosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
