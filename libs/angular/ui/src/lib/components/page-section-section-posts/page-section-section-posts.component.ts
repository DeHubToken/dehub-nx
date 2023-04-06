import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  PageSectionSectionPostsFragment,
  SectionPostFragment,
} from '@dehub/shared/model';
import { isNotNil, resolveColumnWidth } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { SectionPostComponent } from '../section-post/section-post.component';
import { ContentfulDraftDirective } from '../../directives/contentful-draft/contentful-draft.directive';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'dhb-page-section-section-posts',
    template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@fadeInUp]
      class="col-12 sm:col-12 md:col-8 xl:col-8 col-offset-0 sm:col-offset-0 md:col-offset-2 xl:col-offset-2 flex flex-column mb-8"
    >
      <h3 *ngIf="section.title as title">{{ title }}</h3>
      <h5
        *ngIf="section.description as description"
        class="w-full lg:w-8 xl:w-6 mt-0 mb-4 font-normal"
      >
        {{ description }}
      </h5>

      <!-- Section Posts -->
      <div class="grid mt-4">
        <div
          *ngFor="let sectionPost of sectionPosts; let i = index"
          [class]="resolveCol(sectionPost)"
        >
          <div [@fadeInUp]="{ value: '', params: { delay: i * 200 } }">
            <dhb-section-post [sectionPost]="sectionPost"></dhb-section-post>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
    standalone: true,
    imports: [NgIf, ContentfulDraftDirective, NgFor, SectionPostComponent]
})
export class PageSectionSectionPostsComponent implements OnInit {
  @Input() section!: PageSectionSectionPostsFragment;

  sectionPosts: SectionPostFragment[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.sectionPosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }

  resolveCol(sectionPost: SectionPostFragment) {
    return resolveColumnWidth(sectionPost.columnWidth, sectionPost.alignCenter);
  }
}
