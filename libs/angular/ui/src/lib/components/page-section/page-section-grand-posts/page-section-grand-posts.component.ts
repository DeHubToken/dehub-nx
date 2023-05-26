import { NgFor, NgIf } from '@angular/common';
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
import { isNotNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';
import { GrandPostComponent } from '../../post/grand-post/grand-post.component';

@Component({
  selector: 'dhb-page-section-grand-posts',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgFor,
    // UI
    ContentfulDraftDirective,
    GrandPostComponent,
  ],
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
          *ngFor="let grandPost of grandPosts; let i = index"
          class="col-12 md:col-6 flex sm:mb-5"
        >
          <dhb-grand-post
            [grandPost]="grandPost"
            [@fadeInUp]="{ value: '', params: { delay: i * 100 } }"
          />
        </div>
      </div>
    </div>
  `,

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
