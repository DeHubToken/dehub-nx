import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { IconTileComponent } from './icon-tile.component';

@NgModule({
  declarations: [IconTileComponent],
  imports: [
    // Angular
    CommonModule,

    // PrimeNg
    ButtonModule,

    // Libs
    ContentfulDraftDirectiveModule,
  ],
  exports: [IconTileComponent],
})
export class IconTileModule {}
