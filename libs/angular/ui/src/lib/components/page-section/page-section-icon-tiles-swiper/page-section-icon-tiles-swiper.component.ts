import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import {
  IconTileFragment,
  PageSectionIconTilesFragment,
  SwiperResponsiveOptions,
} from '@dehub/shared/model';
import { isNotNil } from '@dehub/shared/utils';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { SwiperOptions } from 'swiper';
import { SwiperDirective } from '../../../directives/swiper/swiper.directive';

import { ContentfulDraftDirective } from '../../../directives/contentful-draft/contentful-draft.directive';
import { IconTileComponent } from '../../icon-tile/icon-tile.component';

@Component({
  selector: 'dhb-page-section-icon-tiles-swiper',
  standalone: true,
  imports: [
    // Angular
    NgIf,
    NgFor,
    // UI
    ContentfulDraftDirective,
    IconTileComponent,
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

      <!-- Icon Tiles -->
      <swiper-container dhbSwiper [swiperOptions]="swiperOptions" init="false">
        <swiper-slide *ngFor="let iconTile of iconTiles">
          <dhb-icon-tile [iconTile]="iconTile"></dhb-icon-tile>
        </swiper-slide>
      </swiper-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnterAnimation({ anchor: 'fadeInUp' })],
})
export class PageSectionIconTilesSwiperComponent implements OnInit {
  @Input() section!: PageSectionIconTilesFragment;
  @Input() swiperResponsiveOptions?: SwiperResponsiveOptions;

  iconTiles: IconTileFragment[] = [];

  swiperOptions?: SwiperOptions;

  constructor() {}

  ngOnInit() {
    if (!this.section) return;

    this.swiperOptions = {
      navigation: true,
      breakpoints:
        this.section.swiperResponsiveOptions || this.swiperResponsiveOptions,
    };

    this.iconTiles = (
      this.section.handpickedIconTilesCollection?.items ?? []
    ).filter(isNotNil);
  }
}
