import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { trackByContentfulIdFn } from '@dehub/angular/util';
import {
  DappPostFragment,
  PageSectionDappPostsFragment,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';
import { DappPostComponent } from '../../post/dapp-post/dapp-post.component';

@Component({
  selector: 'dhb-page-section-dapp-posts',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgFor,
    // UI
    ContentfulDraftDirective,
    DappPostComponent,
  ],
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@fadeInUp]
      class="col-12 sm:col-12 md:col-12 xl:col-6 col-offset-0 sm:col-offset-0 md:col-offset-0 xl:col-offset-3 flex flex-column mb-8"
    >
      <h3 *ngIf="section.title as title">{{ title }}</h3>
      <h5
        *ngIf="section.description as description"
        class="w-full lg:w-8 xl:w-6 mt-0 mb-7 font-normal"
      >
        {{ description }}
      </h5>

      <!-- Dapp Posts -->
      <div class="grid">
        <dhb-dapp-post
          *ngFor="let dappPost of dappPosts; let i = index; trackBy: trackByFn"
          [dappPost]="dappPost"
          [@fadeInUp]="{ value: '', params: { delay: i + 1 * 100 } }"
          class="col-12 sm:col-12 md:col-6 xl:col-4 flex flex-auto"
        />
      </div>
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class PageSectionDappPostsComponent implements OnInit {
  @Input() section!: PageSectionDappPostsFragment;

  dappPosts: DappPostFragment[] = [];

  trackByFn = trackByContentfulIdFn<DappPostFragment>();

  constructor() {}

  ngOnInit() {
    this.dappPosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
