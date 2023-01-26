import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';
import { PageHeaderModule } from '@dehub/angular/ui/components/page-header';
import { PageSectionsModule } from '@dehub/angular/ui/components/page-sections';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { ForModule } from '@rx-angular/template/for';
import { LetModule } from '@rx-angular/template/let';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { AngularFeatureStreamRoutingModule } from './angular-feature-stream-routing.module';
import { AngularFeatureStreamComponent } from './angular-feature-stream.component';
import { CanPlayGuard } from './guards';

@NgModule({
  imports: [
    // Angular
    CommonModule,

    // Libs
    AngularGraphQLModule,
    ContentfulDraftDirectiveModule,
    PageHeaderModule,
    PageSectionsModule,

    // PrimeNg
    ButtonModule,
    FieldsetModule,

    // Rx Angular,
    LetModule,
    ForModule,

    AngularFeatureStreamRoutingModule,
  ],
  declarations: [AngularFeatureStreamComponent],
  providers: [CanPlayGuard],
})
export class AngularFeatureStreamModule {}
