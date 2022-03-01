import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  GrandPostFragment,
  PageSectionGrandPostsFragment,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/util';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-grand-posts',
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@bounceInLeft]
      class="col-12 mb-5"
    >
      <h3>{{ section.title }}</h3>

      <!-- Grand Posts -->
      <div *ngFor="let grandPost of grandPosts">
        <dhb-grand-post [grandPost]="grandPost"></dhb-grand-post>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceInLeftOnEnterAnimation({ anchor: 'bounceInLeft' })],
})
export class PageSectionGrandPostsComponent implements OnInit {
  @Input() section!: PageSectionGrandPostsFragment;

  grandPosts: GrandPostFragment[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.grandPosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
