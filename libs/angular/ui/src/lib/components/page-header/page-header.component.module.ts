import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { PageHeaderComponent } from './page-header.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    ContentfulDraftDirectiveModule,
    // PrimeNg
    ButtonModule,
    PageHeaderComponent,
  ],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
