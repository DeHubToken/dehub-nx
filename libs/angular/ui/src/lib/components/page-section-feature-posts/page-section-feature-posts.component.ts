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
// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation]);

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
      @import '~swiper/scss/navigation';
      @import '~swiper/scss/pagination';

      .swiper {
        padding: 0 0 60px 0;
      }

      .swiper-slide {
        /* Stretch slide vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        -webkit-align-items: stretch;
        align-items: stretch;
        height: auto;
      }

      :root {
        --swiper-theme-color: #fafafa;
      }
      .swiper-button-prev {
        background-image: url('/assets/dehub/icons/prev.svg');
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center;
        width: 40px;
        height: 40px;
        top: auto;
        bottom: 0px;
        right: 60px;
        left: auto;

        &:after {
          display: none;
        }
      }
      .swiper-button-next {
        background-image: url('/assets/dehub/icons/next.svg');
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center;
        width: 40px;
        height: 40px;
        top: auto;
        bottom: 0px;

        &:after {
          display: none;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  // styleUrls: ['./page-section-feature-posts.component.scss'],
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
