import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { ContentfulRichMarkupPipeModule } from '@dehub/angular/ui/pipes/contentful-rich-markup';
import { SafeHtmlPipeModule } from '@dehub/angular/ui/pipes/safe-html';
import { ButtonModule } from 'primeng/button';
import { AngularFeatureNewsDetailComponent } from './angular-feature-news-detail.component';
import { AngularFeatureNewsRoutingModule } from './angular-feature-news-routing.module';
import { AngularFeatureNewsComponent } from './angular-feature-news.component';
import { BasicPostDetailComponent } from './components/basic-post-detail.component';

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,

    // Lib Modules
    ContentfulDraftDirectiveModule,
    ContentfulRichMarkupPipeModule,
    SafeHtmlPipeModule,

    // PrimeNg Modules
    ButtonModule,

    AngularFeatureNewsRoutingModule,
  ],
  declarations: [
    AngularFeatureNewsComponent,
    AngularFeatureNewsDetailComponent,
    BasicPostDetailComponent,
  ],
})
export class AngularFeatureNewsModule {}
