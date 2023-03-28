import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';
import { PushModule } from '@rx-angular/template/push';
import { AngularFeatureNewsDetailComponent } from './angular-feature-news-detail.component';
import { AngularFeatureNewsRoutingModule } from './angular-feature-news-routing.module';
import { AngularFeatureNewsComponent } from './angular-feature-news.component';
import { BasicPostDetailComponent } from './components/basic-post-detail.component';
@NgModule({
  imports: [
    // Angular
    CommonModule,

    // Libs
    AngularGraphQLModule,

    // PrimeNg

    // Rx Angular,
    PushModule,

    // Local
    BasicPostDetailComponent,
    AngularFeatureNewsRoutingModule,
  ],
  declarations: [
    AngularFeatureNewsComponent,
    AngularFeatureNewsDetailComponent,
  ],
})
export class AngularFeatureNewsModule {}
