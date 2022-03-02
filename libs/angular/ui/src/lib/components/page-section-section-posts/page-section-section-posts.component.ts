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
import { isNotNil } from '@dehub/shared/util';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'dhb-page-section-section-posts',
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@fadeInUp]
      class="col-12 sm:col-12 md:col-8 xl:col-8 col-offset-0 sm:col-offset-0 md:col-offset-2 xl:col-offset-2 flex flex-column mb-5"
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
          [class]="resolveCol(sectionPost.columnWidth)"
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
})
export class PageSectionSectionPostsComponent implements OnInit {
  @Input() section!: PageSectionSectionPostsFragment;

  sectionPosts: SectionPostFragment[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.section) return;
    console.log(this.section.description);
    this.sectionPosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }

  resolveCol(colWidth?: string) {
    switch (colWidth) {
      case 'narrow':
        return 'col-12 sm:col-12 md:col-12 xl:col-4';
      case 'wide':
        return 'col-12 sm:col-12 md:col-12 xl:col-6';
      case 'wider':
        return 'col-12 sm:col-12 md:col-12 xl:col-8';
      case 'full':
        return 'col-12';
      default:
        return 'col-12';
    }
  }
}
