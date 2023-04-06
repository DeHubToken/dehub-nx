import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';

import { PushModule } from '@rx-angular/template/push';
import { AngularFeatureLegalRoutingModule } from './angular-feature-legal-routing.module';
import { AngularFeatureLegalComponent } from './angular-feature-legal.component';
import { LegalPostComponent } from './components/legal-post.component';
@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Libs
    AngularGraphQLModule,
    // PrimeNg
    // Rx Angular,
    PushModule,
    AngularFeatureLegalRoutingModule,
    AngularFeatureLegalComponent,
    LegalPostComponent,
  ],
})
export class AngularFeatureLegalModule {}
