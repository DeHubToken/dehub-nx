import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DappPostComponent } from '@dehub/angular/ui/components/dapp-post/dapp-post.component';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [DappPostComponent],
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // PrimeNg
    ButtonModule,
    CardModule,

    // Libs
    ContentfulDraftDirectiveModule,
  ],
  exports: [DappPostComponent],
})
export class DappPostModule {}
