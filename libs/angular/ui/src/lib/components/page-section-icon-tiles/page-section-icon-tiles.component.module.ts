import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { IconTileModule } from '../icon-tile';
import { PageSectionIconTilesComponent } from './page-section-icon-tiles.component';

@NgModule({
  declarations: [PageSectionIconTilesComponent],
  imports: [
    // Angular
    CommonModule,

    // Libs
    ContentfulDraftDirectiveModule,
    IconTileModule,
  ],
  exports: [PageSectionIconTilesComponent],
})
export class PageSectionIconTilesModule {}
