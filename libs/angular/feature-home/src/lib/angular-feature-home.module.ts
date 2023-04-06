import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';

import { LetModule } from '@rx-angular/template/let';
import { AngularFeatureHomeRoutingModule } from './angular-feature-home-routing.module';
import { AngularFeatureHomeComponent } from './angular-feature-home.component';
@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Libs
    AngularGraphQLModule,
    // Rx Angular,
    LetModule,
    AngularFeatureHomeRoutingModule,
    AngularFeatureHomeComponent,
  ],
})
export class AngularFeatureHomeModule {}
