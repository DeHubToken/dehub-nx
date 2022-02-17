import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  BasicPostFragment,
  PageSectionBasicPostsFragment,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/util';
import { bounceInRightOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-basic-posts',
  template: `
    <div *ngIf="section">
      <h3 [@bounceInRight] class="col-12">{{ section.title }}</h3>

      <!-- Basic Posts -->
      <div class="grid">
        <div
          *ngFor="let basicPost of basicPosts; let i = index"
          [@bounceInRight]="{ value: '', params: { delay: i * 100 } }"
          class="col-12 md:col-3"
        >
          <dhb-page-section-basic-post
            [basicPost]="basicPost"
          ></dhb-page-section-basic-post>
        </div>
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
