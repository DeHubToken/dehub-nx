import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { BasicPostComponent } from './basic-post.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    // PrimeNg
    ButtonModule,
    CardModule,
    // Libs
    ContentfulDraftDirectiveModule,
    BasicPostComponent,
  ],
  exports: [BasicPostComponent],
})
export class BasicPostModule {}
