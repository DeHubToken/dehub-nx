import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { IconTileModule } from '../icon-tile';
import { PageSectionIconTilesSwiperComponent } from './page-section-icon-tiles-swiper.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Swiper
    SwiperModule,
    // Libs
    ContentfulDraftDirectiveModule,
    IconTileModule,
    PageSectionIconTilesSwiperComponent,
  ],
  exports: [PageSectionIconTilesSwiperComponent],
})
export class PageSectionIconTilesSwiperModule {}
