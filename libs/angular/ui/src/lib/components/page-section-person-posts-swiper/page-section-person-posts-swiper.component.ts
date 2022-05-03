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
import { isNotNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-person-posts-swiper',
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@fadeInUp]
      class="z-2 relative col-12 mb-8"
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
              [path]="path"
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
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class PageSectionPersonPostsSwiperComponent implements OnInit {
  @Input() section!: PageSectionPersonPostsFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;
  @Input() path?: string;

  personPosts: PersonPostFragment[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.personPosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
