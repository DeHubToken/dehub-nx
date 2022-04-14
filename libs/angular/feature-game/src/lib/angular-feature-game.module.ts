import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GraphQLModule } from '@dehub/angular/graphql';
import { PageHeaderModule } from '@dehub/angular/ui/components/page-header';
import { PageSectionsModule } from '@dehub/angular/ui/components/page-sections';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { AngularFeatureGameRoutingModule } from './angular-feature-game-routing.module';
import { AngularFeatureGameComponent } from './angular-feature-game.component';
@NgModule({
  imports: [
    // Angular
    CommonModule,

    // Libs
    GraphQLModule,
    ContentfulDraftDirectiveModule,
    PageHeaderModule,
    PageSectionsModule,

    // PrimeNg

    AngularFeatureGameRoutingModule,
  ],
  declarations: [AngularFeatureGameComponent],
})
export class AngularFeatureGameModule {}
