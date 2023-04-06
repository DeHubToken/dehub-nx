import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { FaqGroupComponent } from './faq-group.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // PrimeNg
    AccordionModule,
    // Libs
    ContentfulDraftDirectiveModule,
    FaqGroupComponent,
  ],
  exports: [FaqGroupComponent],
})
export class FaqGroupModule {}
