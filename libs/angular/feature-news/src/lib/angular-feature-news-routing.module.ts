import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFeatureNewsDetailComponent } from './angular-feature-news-detail.component';
import { AngularFeatureNewsComponent } from './angular-feature-news.component';

const routes: Routes = [
  {
    path: '',
    component: AngularFeatureNewsComponent,
  },
  {
    path: ':slug',
    component: AngularFeatureNewsDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureNewsRoutingModule {}
