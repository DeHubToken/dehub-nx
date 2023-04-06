import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { FaqGroupModule } from '../faq-group';
import { PageSectionFaQsComponent } from './page-section-faqs.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Libs
    ContentfulDraftDirectiveModule,
    FaqGroupModule,
    PageSectionFaQsComponent,
  ],
  exports: [PageSectionFaQsComponent],
})
export class PageSectionFaQsModule {}
