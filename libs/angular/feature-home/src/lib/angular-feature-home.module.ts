import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageSectionBasicPostsModule } from '@dehub/angular/ui/components/page-section-basic-posts';
import { PageSectionFaQsModule } from '@dehub/angular/ui/components/page-section-faqs';
import { PageSectionFeaturePostsModule } from '@dehub/angular/ui/components/page-section-feature-posts';
import { PageSectionIconTilesModule } from '@dehub/angular/ui/components/page-section-icon-tiles';
import { YoutubeEmbedModule } from '@dehub/angular/ui/components/youtube-embed';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { YoutubeVideoIdPipeModule } from '@dehub/angular/ui/pipes/youtube-video-id';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DialogService } from 'primeng/dynamicdialog';
import { AngularFeatureHomeRoutingModule } from './angular-feature-home-routing.module';
import { AngularFeatureHomeComponent } from './angular-feature-home.component';
@NgModule({
  imports: [
    // Angular Modules
    CommonModule,

    // Lib Modules
    ContentfulDraftDirectiveModule,
    YoutubeVideoIdPipeModule,
    YoutubeEmbedModule,
    PageSectionFeaturePostsModule,
    PageSectionBasicPostsModule,
    PageSectionIconTilesModule,
    PageSectionFaQsModule,

    // PrimeNg Modules
    ButtonModule,
    CarouselModule,
    CardModule,

    AngularFeatureHomeRoutingModule,
  ],
  declarations: [AngularFeatureHomeComponent],
  providers: [DialogService],
})
export class AngularFeatureHomeModule {}
