import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'subscribe',
        loadComponent: () => import('./angular-feature-mailing.component'),
      },
    ],
  },
];
