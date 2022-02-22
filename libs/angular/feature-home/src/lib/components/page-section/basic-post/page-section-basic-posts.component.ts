import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  BasicPostFragment,
  BreakPoint,
  CarouselResponsiveOptions,
  PageSectionBasicPostsFragment,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/util';
import { bounceInRightOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-basic-posts',
  template: `
    <div *ngIf="section" class="col-12">
      <h3 [@bounceInRight]>{{ section.title }}</h3>

      <!-- Basic Posts -->
      <div [@bounceInRight]>
        <p-carousel
          *ngIf="basicPosts.length > 0"
          [value]="basicPosts"
          [circular]="basicPosts.length > 1"
          [autoplayInterval]="3000"
          [responsiveOptions]="carouselResponsiveOptions"
          [numVisible]="carouselResponsiveOptions[0].numVisible"
          [numScroll]="carouselResponsiveOptions[0].numScroll"
        >
          <ng-template let-basicPost pTemplate="item">
            <div class="">
              <dhb-page-section-basic-post
                [basicPost]="basicPost"
              ></dhb-page-section-basic-post>
            </div>
          </ng-template>
        </p-carousel>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInRightOnEnterAnimation({ anchor: 'bounceInRight' })],
})
export class PageSectionBasicPostsComponent implements OnInit {
  @Input() section!: PageSectionBasicPostsFragment;

  basicPosts: BasicPostFragment[] = [];

  carouselResponsiveOptions: CarouselResponsiveOptions = [
    {
      breakpoint: BreakPoint.sm,
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: BreakPoint.md,
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: BreakPoint.lg,
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: BreakPoint.xl,
      numVisible: 4,
      numScroll: 1,
    },
  ];

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
