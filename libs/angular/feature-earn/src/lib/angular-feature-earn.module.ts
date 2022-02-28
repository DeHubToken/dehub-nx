import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageSectionsModule } from '@dehub/angular/ui/components/page-sections';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { AngularFeatureEarnComponent } from 'libs/angular/feature-earn/src/lib/angular-feature-earn.component';
import { AngularFeatureEarnRoutingModule } from './angular-feature-earn-routing.module';

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,

    // Lib Modules
    ContentfulDraftDirectiveModule,
    PageSectionsModule,

    // PrimeNg Modules

    AngularFeatureEarnRoutingModule,
  ],
  declarations: [AngularFeatureEarnComponent],
})
export class AngularFeatureEarnModule {}
