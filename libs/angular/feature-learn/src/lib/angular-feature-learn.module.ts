import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';

import { LetModule } from '@rx-angular/template/let';
import { AngularFeatureLearnRoutingModule } from './angular-feature-learn-routing.module';
import { AngularFeatureLearnComponent } from './angular-feature-learn.component';
@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Libs
    AngularGraphQLModule,
    // Rx Angular,
    LetModule,
    AngularFeatureLearnRoutingModule,
    AngularFeatureLearnComponent,
  ],
})
export class AngularFeatureLearnModule {}
