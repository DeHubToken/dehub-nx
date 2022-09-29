import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';
import { BackButtonModule } from '@dehub/angular/ui/components/buttons/back-button';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { ContentfulRichMarkupPipeModule } from '@dehub/angular/ui/pipes/contentful-rich-markup';
import { SafeHtmlPipeModule } from '@dehub/angular/ui/pipes/safe-html';
import { PushModule } from '@rx-angular/template';
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
    BackButtonModule,

    // PrimeNg

    // Rx Angular,
    PushModule,

    AngularFeatureLegalRoutingModule,
  ],
  declarations: [AngularFeatureLegalComponent, LegalPostComponent],
})
export class AngularFeatureLegalModule {}
