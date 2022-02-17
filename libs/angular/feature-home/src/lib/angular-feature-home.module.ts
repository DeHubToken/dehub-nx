import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { ButtonModule } from 'primeng/button';
import { AngularFeatureHomeRoutingModule } from './angular-feature-home-routing.module';
import { AngularFeatureHomeComponent } from './angular-feature-home.component';
import {
  PageSectionBasicPostComponent,
  PageSectionBasicPostsComponent,
} from './components/page-section/basic-post';
import { PageSectionFaQsComponent } from './components/page-section/faqs/page-section-faqs.component';
import {
  PageSectionIconTileComponent,
  PageSectionIconTilesComponent,
} from './components/page-section/icon-tile';

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,

    // Lib Modules
    ContentfulDraftDirectiveModule,

    // PrimeNg Modules
    ButtonModule,

    AngularFeatureHomeRoutingModule,
  ],
  declarations: [
    AngularFeatureHomeComponent,

    // Page Section Components
    PageSectionBasicPostsComponent,
    PageSectionBasicPostComponent,
    PageSectionIconTilesComponent,
    PageSectionIconTileComponent,
    PageSectionFaQsComponent,
  ],
})
export class AngularFeatureHomeModule {}
