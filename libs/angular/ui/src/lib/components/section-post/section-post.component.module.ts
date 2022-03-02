import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { SafeHtmlPipeModule } from '../../pipes/safe-html';
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
