import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';
import { PageHeaderModule } from '@dehub/angular/ui/components/page-header';
import { PageSectionsModule } from '@dehub/angular/ui/components/page-sections';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { LetModule } from '@rx-angular/template';
import { AngularFeatureLearnRoutingModule } from './angular-feature-learn-routing.module';
import { AngularFeatureLearnComponent } from './angular-feature-learn.component';
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

    AngularFeatureLearnRoutingModule,
  ],
  declarations: [AngularFeatureLearnComponent],
})
export class AngularFeatureLearnModule {}
