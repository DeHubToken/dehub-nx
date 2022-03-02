import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { DappPostComponent } from '../dapp-post/dapp-post.component';

@NgModule({
  declarations: [DappPostComponent],
  imports: [
    // Angular
    CommonModule,

    // PrimeNg
    ButtonModule,
    CardModule,

    // Libs
    ContentfulDraftDirectiveModule,
  ],
  exports: [DappPostComponent],
})
export class DappPostModule {}
