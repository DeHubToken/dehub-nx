import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FeaturePostFragment,
  PageSectionFeaturePostsFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/util';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-feature-posts',
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
      <swiper
        [navigation]="true"
        [breakpoints]="
          section.swiperResponsiveOptions || swiperResponsiveOptions
        "
      >
        <ng-container *ngFor="let featurePost of featurePosts">
          <ng-template swiperSlide>
            <dhb-feature-post [featurePost]="featurePost"></dhb-feature-post>
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
export class PageSectionFeaturePostsComponent implements OnInit {
  @Input() section!: PageSectionFeaturePostsFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;

  featurePosts: FeaturePostFragment[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.featurePosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
