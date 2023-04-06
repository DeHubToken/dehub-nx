import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { DappPostComponent } from '../dapp-post/dapp-post.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // PrimeNg
    ButtonModule,
    CardModule,
    // Libs
    ContentfulDraftDirectiveModule,
    DappPostComponent,
  ],
  exports: [DappPostComponent],
})
export class DappPostModule {}
