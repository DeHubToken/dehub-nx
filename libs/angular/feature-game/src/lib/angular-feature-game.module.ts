import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';

import { LetModule } from '@rx-angular/template/let';
import { AngularFeatureGameRoutingModule } from './angular-feature-game-routing.module';
import { AngularFeatureGameComponent } from './angular-feature-game.component';
@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Libs
    AngularGraphQLModule,
    // Rx Angular,
    LetModule,
    AngularFeatureGameRoutingModule,
    AngularFeatureGameComponent,
  ],
})
export class AngularFeatureGameModule {}
