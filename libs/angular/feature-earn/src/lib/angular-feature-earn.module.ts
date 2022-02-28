import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageSectionsModule } from '@dehub/angular/ui/components/page-sections';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { AngularFeatureEarnRoutingModule } from 'libs/angular/feature-earn/src/lib/angular-feature-earn-routing.module';
import { AngularFeatureEarnComponent } from 'libs/angular/feature-earn/src/lib/angular-feature-earn.component';

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
