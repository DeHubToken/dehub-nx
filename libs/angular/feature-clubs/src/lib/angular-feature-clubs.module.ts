import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';

import { LetModule } from '@rx-angular/template/let';
import { AngularFeatureClubsRoutingModule } from './angular-feature-clubs-routing.module';
import { AngularFeatureClubsComponent } from './angular-feature-clubs.component';
@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Libs
    AngularGraphQLModule,
    // Rx Angular,
    LetModule,
    AngularFeatureClubsRoutingModule,
    AngularFeatureClubsComponent,
  ],
})
export class AngularFeatureClubsModule {}
