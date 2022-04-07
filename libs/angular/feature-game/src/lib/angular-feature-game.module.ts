import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '@dehub/angular/ui/components/page-header';
import { PageSectionsModule } from '@dehub/angular/ui/components/page-sections';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { AsPipeModule } from '@dehub/angular/ui/pipes/as-pipe';
import { AngularFeatureGameRoutingModule } from './angular-feature-game-routing.module';
import { AngularFeatureGameComponent } from './angular-feature-game.component';

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,

    // Lib Modules
    ContentfulDraftDirectiveModule,
    PageHeaderModule,
    PageSectionsModule,
    AsPipeModule,

    // PrimeNg Modules

    AngularFeatureGameRoutingModule,
  ],
  declarations: [AngularFeatureGameComponent],
})
export class AngularFeatureGameModule {}
