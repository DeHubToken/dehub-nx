import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { BasicPostComponent } from './basic-post.component';

@NgModule({
  declarations: [BasicPostComponent],
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // PrimeNg
    CardModule,

    // Libs
    ContentfulDraftDirectiveModule,
  ],
  exports: [BasicPostComponent],
})
export class BasicPostModule {}
