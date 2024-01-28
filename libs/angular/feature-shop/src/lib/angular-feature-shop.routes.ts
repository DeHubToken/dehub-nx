import { Routes } from '@angular/router';
import { AuthenticatedGuard } from '@dehub/angular/core';
import { ProductDetailService } from './services';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./angular-feature-shop.component'),
  },
  {
    path: ':slug',
    loadComponent: () =>
      import('./angular-feature-shop-product-detail.component'),
    providers: [ProductDetailService],
  },
  {
    path: 'checkout',
    outlet: 'modal',
    children: [
      {
        path: ':slug',
        loadComponent: () =>
          import('./angular-feature-shop-checkout.component'),
        canActivate: [AuthenticatedGuard],
        providers: [ProductDetailService],
      },
    ],
  },
];
