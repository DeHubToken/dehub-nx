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
import { bounceInLeftOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-feature-posts',
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@bounceInLeft]
      class="col-12"
    >
      <h3>{{ section.title }}</h3>

      <!-- Feature Posts -->
      <swiper [navigation]="true" [breakpoints]="swiperResponsiveOptions">
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
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' })],
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
