import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { AngularFeatureMailingRoutingModule } from './angular-feature-mailing-routing.module';
import { AngularFeatureMailingComponent } from './angular-feature-mailing.component';

export const angularFeatureMailingRoutes: Route[] = [];

@NgModule({
  imports: [
    // Angular
    CommonModule,
    AngularFeatureMailingRoutingModule,
    AngularFeatureMailingComponent,
  ],
})
export class AngularFeatureMailingModule {}
