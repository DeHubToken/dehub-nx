import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { FaqGroupComponentModule } from '../faq-group/faq-group.component.module';
import { PageSectionFaQsComponent } from './page-section-faqs.component';

@NgModule({
  declarations: [PageSectionFaQsComponent],
  imports: [
    // Angular
    CommonModule,

    // Libs
    ContentfulDraftDirectiveModule,
    FaqGroupComponentModule,
  ],
  exports: [PageSectionFaQsComponent],
})
export class PageSectionFaQsComponentModule {}
