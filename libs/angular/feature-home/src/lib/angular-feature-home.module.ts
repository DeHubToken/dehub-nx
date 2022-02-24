import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageSectionFaQsComponentModule } from '@dehub/angular/ui/components/page-section-faqs';
import { PageSectionIconTilesComponentModule } from '@dehub/angular/ui/components/page-section-icon-tiles';
import { YoutubeEmbedModule } from '@dehub/angular/ui/components/youtube-embed';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { YoutubeVideoIdPipeModule } from '@dehub/angular/ui/pipes/youtube-video-id';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DialogService } from 'primeng/dynamicdialog';
import { AngularFeatureHomeRoutingModule } from './angular-feature-home-routing.module';
import { AngularFeatureHomeComponent } from './angular-feature-home.component';
import {
  PageSectionBasicPostComponent,
  PageSectionBasicPostsComponent,
} from './components/page-section/basic-post';
import {
  PageSectionFeaturePostComponent,
  PageSectionFeaturePostsComponent,
} from './components/page-section/feature-post';
@NgModule({
  imports: [
    // Angular Modules
    CommonModule,

    // Lib Modules
    ContentfulDraftDirectiveModule,
    YoutubeVideoIdPipeModule,
    YoutubeEmbedModule,
    PageSectionIconTilesComponentModule,
    PageSectionFaQsComponentModule,

    // PrimeNg Modules
    ButtonModule,
    CarouselModule,
    CardModule,

    AngularFeatureHomeRoutingModule,
  ],
  declarations: [
    AngularFeatureHomeComponent,

    // Page Section Components
    PageSectionFeaturePostsComponent,
    PageSectionFeaturePostComponent,
    PageSectionBasicPostsComponent,
    PageSectionBasicPostComponent,
  ],
  providers: [DialogService],
})
export class AngularFeatureHomeModule {}
