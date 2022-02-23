import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { YoutubeVideoIdPipeModule } from '@dehub/angular/ui/pipes/youtube-video-id';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { AngularFeatureHomeRoutingModule } from './angular-feature-home-routing.module';
import { AngularFeatureHomeComponent } from './angular-feature-home.component';
import {
  PageSectionBasicPostComponent,
  PageSectionBasicPostsComponent,
} from './components/page-section/basic-post';
import {
  PageSectionFaqGroupComponent,
  PageSectionFaQsComponent,
} from './components/page-section/faqs';
import {
  PageSectionFeaturePostComponent,
  PageSectionFeaturePostsComponent,
} from './components/page-section/feature-post';
import {
  PageSectionIconTileComponent,
  PageSectionIconTilesComponent,
} from './components/page-section/icon-tile';
@NgModule({
  imports: [
    // Angular Modules
    CommonModule,
    YouTubePlayerModule,

    // Lib Modules
    ContentfulDraftDirectiveModule,
    YoutubeVideoIdPipeModule,

    // PrimeNg Modules
    ButtonModule,
    AccordionModule,
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
    PageSectionIconTilesComponent,
    PageSectionIconTileComponent,
    PageSectionFaQsComponent,
    PageSectionFaqGroupComponent,
  ],
})
export class AngularFeatureHomeModule {}
