import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { IconTileComponent } from './icon-tile.component';

@NgModule({
  declarations: [IconTileComponent],
  imports: [
    // Angular
    CommonModule,

    // Libs
    ContentfulDraftDirectiveModule,
  ],
  exports: [IconTileComponent],
})
export class IconTileModule {}
