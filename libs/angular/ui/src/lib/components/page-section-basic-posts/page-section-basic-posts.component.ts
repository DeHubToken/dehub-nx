import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  BasicPostFragment,
  CarouselResponsiveOptions,
  PageSectionBasicPostsFragment,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/util';
import { bounceInRightOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-basic-posts',
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@bounceInRight]
      class="col-12"
    >
      <h3>{{ section.title }}</h3>

      <!-- Basic Posts -->
      <p-carousel
        *ngIf="basicPosts.length > 0"
        [value]="basicPosts"
        [circular]="false"
        [autoplayInterval]="0"
        [numVisible]="5"
        [numScroll]="1"
        [responsiveOptions]="carouselResponsiveOptions"
      >
        <ng-template let-basicPost pTemplate="item">
          <div class="">
            <dhb-basic-post [basicPost]="basicPost"></dhb-basic-post>
          </div>
        </ng-template>
      </p-carousel>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInRightOnEnterAnimation({ anchor: 'bounceInRight' })],
})
export class PageSectionBasicPostsComponent implements OnInit {
  @Input() section!: PageSectionBasicPostsFragment;
  @Input() carouselResponsiveOptions: CarouselResponsiveOptions = [];

  basicPosts: BasicPostFragment[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.basicPosts = [
      ...(this.section.handpickedPostsCollection?.items ?? []),
      ...(this.section.postsByCategory?.linkedFrom?.basicPostCollection
        ?.items ?? []),
    ].filter(isNotNil);
  }
}
