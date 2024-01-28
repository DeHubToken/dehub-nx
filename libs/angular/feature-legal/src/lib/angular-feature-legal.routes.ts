import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'terms',
    pathMatch: 'full',
  },
  {
    path: ':slug',
    loadComponent: () => import('./angular-feature-legal.component'),
  },
];
