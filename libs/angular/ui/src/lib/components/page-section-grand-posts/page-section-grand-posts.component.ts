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
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-grand-posts',
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@fadeInUp]
      class="col-12 md:col-12 lg:col-12 xl:col-10 col-offset-0 md:col-offset-0 lg:col-offset-0 xl:col-offset-1 mb-5"
    >
      <h3 *ngIf="section.title as title">{{ title }}</h3>
      <h5
        *ngIf="section.description as description"
        class="w-full lg:w-8 xl:w-6 mt-0 mb-7 font-normal"
      >
        {{ description }}
      </h5>

      <!-- Grand Posts -->
      <div class="grid">
        <div
          *ngFor="let grandPost of grandPosts"
          class="col-12 md:col-6 flex sm:mb-5"
        >
          <dhb-grand-post [grandPost]="grandPost"></dhb-grand-post>
        </div>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
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
