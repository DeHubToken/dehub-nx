import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFeatureHomeRoutingModule } from './angular-feature-home-routing.module';
import { AngularFeatureHomeComponent } from './angular-feature-home.component';
import { PageSectionBasicPostsComponent } from './components/page-section/page-section-basic-posts.component';
import { PageSectionFaQsComponent } from './components/page-section/page-section-faqs.component';
import { PageSectionIconTilesComponent } from './components/page-section/page-section-icon-tiles.component';

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,

    // Lib Modules

    // PrimeNg Modules

    AngularFeatureHomeRoutingModule,
  ],
  declarations: [
    AngularFeatureHomeComponent,

    // Page Section Components
    PageSectionBasicPostsComponent,
    PageSectionIconTilesComponent,
    PageSectionFaQsComponent,
  ],
})
export class AngularFeatureHomeModule {}
