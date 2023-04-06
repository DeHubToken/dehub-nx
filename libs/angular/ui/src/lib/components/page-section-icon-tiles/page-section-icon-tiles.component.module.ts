import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { IconTileModule } from '../icon-tile';
import { PageSectionIconTilesComponent } from './page-section-icon-tiles.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Libs
    ContentfulDraftDirectiveModule,
    IconTileModule,
    PageSectionIconTilesComponent,
  ],
  exports: [PageSectionIconTilesComponent],
})
export class PageSectionIconTilesModule {}
