import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
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
          [circular]="featurePosts.length > 1"
          [autoplayInterval]="3000"
          [numVisible]="5"
          [numScroll]="1"
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

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.featurePosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
