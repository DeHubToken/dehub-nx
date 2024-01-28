import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./angular-feature-news.component'),
  },
  {
    path: ':slug',
    loadComponent: () => import('./angular-feature-news-detail.component'),
  },
];
