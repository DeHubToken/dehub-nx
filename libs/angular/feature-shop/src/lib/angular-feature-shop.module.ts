import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GraphQLModule } from '@dehub/angular/graphql';
import { AngularFeatureShopRoutingModule } from './angular-feature-shop-routing.module';
@NgModule({
  imports: [
    // Angular
    CommonModule,

    // Libs
    GraphQLModule,

    // PrimeNg

    AngularFeatureShopRoutingModule,
  ],
})
export class AngularFeatureShopModule {}
