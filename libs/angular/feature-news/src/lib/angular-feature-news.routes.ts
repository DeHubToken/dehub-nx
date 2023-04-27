import { Routes } from '@angular/router';
import { AngularFeatureNewsDetailComponent } from './angular-feature-news-detail.component';
import { AngularFeatureNewsComponent } from './angular-feature-news.component';

export const routes: Routes = [
  {
    path: '',
    component: AngularFeatureNewsComponent,
  },
  {
    path: ':slug',
    component: AngularFeatureNewsDetailComponent,
  },
];
