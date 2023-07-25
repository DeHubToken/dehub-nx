import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { trackByContentfulIdFn } from '@dehub/angular/util';
import {
  PageSectionPersonPostsFragment,
  PersonPostFragment,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';
import { PersonPostComponent } from '../../post/person-post/person-post.component';

@Component({
  selector: 'dhb-page-section-person-posts',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgFor,
    // UI
    ContentfulDraftDirective,
    PersonPostComponent,
  ],
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@fadeInUp]
      class="col-12 sm:col-12 md:col-10 xl:col-8 col-offset-0 sm:col-offset-0 md:col-offset-1 xl:col-offset-2 flex flex-column mb-8"
    >
      <h3 *ngIf="section.title as title">{{ title }}</h3>
      <h5
        *ngIf="section.description as description"
        class="w-full lg:w-8 xl:w-6 mt-0 mb-7 font-normal"
      >
        {{ description }}
      </h5>

      <!-- Person Posts -->
      <div class="grid">
        <dhb-person-post
          *ngFor="
            let personPost of personPosts;
            let i = index;
            trackBy: trackByFn
          "
          [personPost]="personPost"
          [path]="path"
          [@fadeInUp]="{ value: '', params: { delay: i + 1 * 100 } }"
          class="col-12 sm:col-12 md:col-6 xl:col-4 flex-grow-0 p-4"
        />
      </div>
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class PageSectionPersonPostsComponent implements OnInit {
  @Input() section!: PageSectionPersonPostsFragment;
  @Input() path?: string;

  personPosts: PersonPostFragment[] = [];

  trackByFn = trackByContentfulIdFn<PersonPostFragment>();

  constructor() {}

  ngOnInit() {
    this.personPosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
