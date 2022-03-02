import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlPipeModule } from '@dehub/angular/ui/pipes/safe-html';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { SectionPostComponent } from './section-post.component';

@NgModule({
  declarations: [SectionPostComponent],
  imports: [
    // Angular
    CommonModule,

    // Libs
    ContentfulDraftDirectiveModule,
    SafeHtmlPipeModule,
  ],
  exports: [SectionPostComponent],
})
export class SectionPostModule {}
