import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AngularFeatureNewsDetailComponent } from './angular-feature-news-detail.component';
import { AngularFeatureNewsRoutingModule } from './angular-feature-news-routing.module';
import { AngularFeatureNewsComponent } from './angular-feature-news.component';

export const angularFeatureNewsRoutes: Route[] = [];

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,

    // Lib Modules

    // PrimeNg Modules
    ButtonModule,

    AngularFeatureNewsRoutingModule,
  ],
  declarations: [
    AngularFeatureNewsComponent,
    AngularFeatureNewsDetailComponent,
  ],
})
export class AngularFeatureNewsModule {}
