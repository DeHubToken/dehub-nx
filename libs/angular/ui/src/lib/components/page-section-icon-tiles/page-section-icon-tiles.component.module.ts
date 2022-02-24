import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { IconTileComponentModule } from '../icon-tile/icon-tile.component.module';
import { PageSectionIconTilesComponent } from './page-section-icon-tiles.component';

@NgModule({
  declarations: [PageSectionIconTilesComponent],
  imports: [
    // Angular
    CommonModule,

    // Libs
    ContentfulDraftDirectiveModule,
    IconTileComponentModule,
  ],
  exports: [PageSectionIconTilesComponent],
})
export class PageSectionIconTilesComponentModule {}
