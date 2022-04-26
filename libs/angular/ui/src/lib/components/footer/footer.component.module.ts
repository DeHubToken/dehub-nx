import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ContentfulDraftDirectiveModule } from '../../directives/contentful-draft';
import { CTAGroupPipe } from './cta-group.pipe';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent, CTAGroupPipe],
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // PrimeNg
    ButtonModule,

    // Libs
    ContentfulDraftDirectiveModule,
  ],
  exports: [FooterComponent],
})
export class FooterModule {}
