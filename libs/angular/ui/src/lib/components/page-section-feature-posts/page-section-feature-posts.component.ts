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
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@bounceInLeft]
      class="col-12"
    >
      <h3>{{ section.title }}</h3>

      <!-- Feature Posts -->
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
          <dhb-feature-post [featurePost]="featurePost"></dhb-feature-post>
        </ng-template>
      </p-carousel>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' })],
})
export class PageSectionFeaturePostsComponent implements OnInit {
  @Input() section!: PageSectionFeaturePostsFragment;
  @Input() carouselResponsiveOptions: CarouselResponsiveOptions = [];

  featurePosts: FeaturePostFragment[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.featurePosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
