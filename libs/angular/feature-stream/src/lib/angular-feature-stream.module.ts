import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';

import { ForModule } from '@rx-angular/template/for';
import { LetModule } from '@rx-angular/template/let';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { AngularFeatureStreamRoutingModule } from './angular-feature-stream-routing.module';
import { AngularFeatureStreamComponent } from './angular-feature-stream.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Libs
    AngularGraphQLModule,
    // PrimeNg
    ButtonModule,
    FieldsetModule,
    // Rx Angular,
    LetModule,
    ForModule,
    AngularFeatureStreamRoutingModule,
    AngularFeatureStreamComponent,
  ],
})
export class AngularFeatureStreamModule {}
