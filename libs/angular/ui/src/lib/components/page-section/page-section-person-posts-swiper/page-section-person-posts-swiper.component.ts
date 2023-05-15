import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import {
  PageSectionPersonPostsFragment,
  PersonPostFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { SwiperOptions } from 'swiper';

import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';
import { SwiperDirective } from '../../../directives/swiper/swiper.directive';
import { PersonPostComponent } from '../../post/person-post/person-post.component';
@Component({
  selector: 'dhb-page-section-person-posts-swiper',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgFor,
    // UI
    ContentfulDraftDirective,
    PersonPostComponent,
    SwiperDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div
      *ngIf="section"
      [dhbContentfulDraft]="section.sys"
      [@fadeInUp]
      class="col-12 mb-8"
    >
      <h3 *ngIf="section.title as title">{{ title }}</h3>
      <h5
        *ngIf="section.description as description"
        class="w-full lg:w-8 xl:w-6 mt-0 mb-7 font-normal"
      >
        {{ description }}
      </h5>

      <!-- Person Posts -->
      <swiper-container dhbSwiper [swiperOptions]="swiperOptions" init="false">
        <swiper-slide *ngFor="let personPost of personPosts">
          <dhb-person-post
            [personPost]="personPost"
            [path]="path"
          ></dhb-person-post>
        </swiper-slide>
      </swiper-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class PageSectionPersonPostsSwiperComponent implements OnInit {
  @Input() section!: PageSectionPersonPostsFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;
  @Input() path?: string;

  personPosts: PersonPostFragment[] = [];

  swiperOptions?: SwiperOptions;

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.swiperOptions = {
      navigation: true,
      breakpoints:
        this.section.swiperResponsiveOptions || this.swiperResponsiveOptions,
    };

    this.personPosts = (
      this.section.handpickedPostsCollection?.items ?? []
    ).filter(isNotNil);
  }
}
