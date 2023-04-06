import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { HeavyPictureComponent } from './heavy-picture.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Libs
    ContentfulDraftDirectiveModule,
    HeavyPictureComponent,
  ],
  exports: [HeavyPictureComponent],
})
export class HeavyPictureModule {}
