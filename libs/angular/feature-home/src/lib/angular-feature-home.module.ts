import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';
import { PageHeaderModule } from '@dehub/angular/ui/components/page-header';
import { PageSectionsModule } from '@dehub/angular/ui/components/page-sections';
import { YoutubeEmbedModule } from '@dehub/angular/ui/components/youtube-embed';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { YoutubeVideoIdPipeModule } from '@dehub/angular/ui/pipes/youtube-video-id';
import { AngularFeatureHomeRoutingModule } from './angular-feature-home-routing.module';
import { AngularFeatureHomeComponent } from './angular-feature-home.component';
@NgModule({
  imports: [
    // Angular
    CommonModule,

    // Libs
    AngularGraphQLModule,
    ContentfulDraftDirectiveModule,
    YoutubeVideoIdPipeModule,
    YoutubeEmbedModule,
    PageHeaderModule,
    PageSectionsModule,

    // PrimeNg

    AngularFeatureHomeRoutingModule,
  ],
  declarations: [AngularFeatureHomeComponent],
})
export class AngularFeatureHomeModule {}
