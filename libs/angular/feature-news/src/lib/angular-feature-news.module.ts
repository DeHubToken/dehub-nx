import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { ContentfulRichMarkupPipeModule } from '@dehub/angular/ui/pipes/contentful-rich-markup';
import { SafeHtmlPipeModule } from '@dehub/angular/ui/pipes/safe-html';
import { PushModule } from '@rx-angular/template';
import { AngularFeatureNewsDetailComponent } from './angular-feature-news-detail.component';
import { AngularFeatureNewsRoutingModule } from './angular-feature-news-routing.module';
import { AngularFeatureNewsComponent } from './angular-feature-news.component';
import { BasicPostDetailComponent } from './components/basic-post-detail.component';
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

    // Rx Angular,
    PushModule,

    AngularFeatureNewsRoutingModule,
  ],
  declarations: [
    AngularFeatureNewsComponent,
    AngularFeatureNewsDetailComponent,
    BasicPostDetailComponent,
  ],
})
export class AngularFeatureNewsModule {}
