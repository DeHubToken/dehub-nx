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

  basicPosts: BasicPostFragment[] = [];

  carouselResponsiveOptions: CarouselResponsiveOptions = [
    {
      breakpoint: '1570px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '960px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '700px',
      numVisible: 1.15,
      numScroll: 1.15,
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
