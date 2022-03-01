import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageSectionsModule } from '@dehub/angular/ui/components/page-sections';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { AngularFeatureGameRoutingModule } from './angular-feature-game-routing.module';
import { AngularFeatureGameComponent } from './angular-feature-game.component';

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,

    // Lib Modules
    ContentfulDraftDirectiveModule,
    PageSectionsModule,

    // PrimeNg Modules

    AngularFeatureGameRoutingModule,
  ],
  declarations: [AngularFeatureGameComponent],
})
export class AngularFeatureGameModule {}
