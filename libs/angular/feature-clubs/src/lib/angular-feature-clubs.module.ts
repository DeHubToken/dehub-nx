import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';
import { PageHeaderModule } from '@dehub/angular/ui/components/page-header';
import { PageSectionsModule } from '@dehub/angular/ui/components/page-sections';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { LetModule } from '@rx-angular/template/let';
import { AngularFeatureClubsRoutingModule } from './angular-feature-clubs-routing.module';
import { AngularFeatureClubsComponent } from './angular-feature-clubs.component';
@NgModule({
  imports: [
    // Angular
    CommonModule,

    // Libs
    AngularGraphQLModule,
    ContentfulDraftDirectiveModule,
    PageHeaderModule,
    PageSectionsModule,

    // Rx Angular,
    LetModule,

    AngularFeatureClubsRoutingModule,
  ],
  declarations: [AngularFeatureClubsComponent],
})
export class AngularFeatureClubsModule {}
