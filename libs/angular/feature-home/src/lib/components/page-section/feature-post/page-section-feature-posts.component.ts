import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  CarouselResponsiveOptions,
  FeaturePostFragment,
  PageSectionFeaturePostsFragment,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/util';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-feature-posts',
  template: `
    <div *ngIf="section" class="col-12">
      <h3 [@bounceInLeft]>{{ section.title }}</h3>

      <!-- Feature Posts -->
      <div [@bounceInLeft]>
        <p-carousel
          *ngIf="featurePosts.length > 0"
          [value]="featurePosts"
          [circular]="false"
          [autoplayInterval]="0"
          [numVisible]="4"
          [numScroll]="1"
          [responsiveOptions]="carouselResponsiveOptions"
        >
          <ng-template let-featurePost pTemplate="item">
            <dhb-page-section-feature-post
              [featurePost]="featurePost"
            ></dhb-page-section-feature-post>
          </ng-template>
        </p-carousel>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' })],
})
export class PageSectionFeaturePostsComponent implements OnInit {
  @Input() section!: PageSectionFeaturePostsFragment;

  featurePosts: FeaturePostFragment[] = [];

  carouselResponsiveOptions: CarouselResponsiveOptions = [
    {
      breakpoint: '1290px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '960px',
      numVisible: 1.15,
      numScroll: 1.15,
    },
  ];

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.featurePosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
