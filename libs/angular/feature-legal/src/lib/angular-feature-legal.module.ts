import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { ContentfulRichMarkupPipeModule } from '@dehub/angular/ui/pipes/contentful-rich-markup';
import { SafeHtmlPipeModule } from '@dehub/angular/ui/pipes/safe-html';
import { ButtonModule } from 'primeng/button';
import { AngularFeatureLegalRoutingModule } from './angular-feature-legal-routing.module';
import { AngularFeatureLegalComponent } from './angular-feature-legal.component';
import { LegalPostComponent } from './components/legal-post.component';
@NgModule({
  imports: [
    // Angular
    CommonModule,

    // Libs
    AngularGraphQLModule,
    ContentfulDraftDirectiveModule,
    ContentfulRichMarkupPipeModule,
    SafeHtmlPipeModule,

    // PrimeNg
    ButtonModule,

    AngularFeatureLegalRoutingModule,
  ],
  declarations: [AngularFeatureLegalComponent, LegalPostComponent],
})
export class AngularFeatureLegalModule {}
