import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { FaqGroupModule } from '../faq-group';
import { PageSectionFaQsComponent } from './page-section-faqs.component';

@NgModule({
  declarations: [PageSectionFaQsComponent],
  imports: [
    // Angular
    CommonModule,

    // Libs
    ContentfulDraftDirectiveModule,
    FaqGroupModule,
  ],
  exports: [PageSectionFaQsComponent],
})
export class PageSectionFaQsModule {}
