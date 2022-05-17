import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GraphQLModule } from '@dehub/angular/graphql';
import { PageHeaderModule } from '@dehub/angular/ui/components/page-header';
import { PageSectionsModule } from '@dehub/angular/ui/components/page-sections';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { AngularFeatureShopRoutingModule } from './angular-feature-shop-routing.module';
import { AngularFeatureShopComponent } from './angular-feature-shop.component';
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

    AngularFeatureShopRoutingModule,
  ],
  declarations: [AngularFeatureShopComponent],
})
export class AngularFeatureShopModule {}
