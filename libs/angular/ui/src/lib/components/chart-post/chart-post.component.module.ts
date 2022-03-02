import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { ChartPostComponent } from './chart-post.component';

@NgModule({
  declarations: [ChartPostComponent],
  imports: [
    // Angular
    CommonModule,

    // PrimeNg
    ChartModule,

    // Libs
    ContentfulDraftDirectiveModule,
  ],
  exports: [ChartPostComponent],
})
export class ChartPostModule {}
