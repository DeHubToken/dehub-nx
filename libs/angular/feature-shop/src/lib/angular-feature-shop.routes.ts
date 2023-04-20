import { Routes } from '@angular/router';
import { AuthenticatedGuard } from '@dehub/angular/core';
import { AngularFeatureShopCheckoutComponent } from './angular-feature-shop-checkout.component';
import { AngularFeatureShopProductDetailComponent } from './angular-feature-shop-product-detail.component';
import { AngularFeatureShopComponent } from './angular-feature-shop.component';
import { ProductDetailService } from './services';

export const routes: Routes = [
  {
    path: '',
    component: AngularFeatureShopComponent,
  },
  {
    path: ':slug',
    component: AngularFeatureShopProductDetailComponent,
    providers: [ProductDetailService],
  },
  {
    path: 'checkout',
    outlet: 'modal',
    children: [
      {
        path: ':slug',
        component: AngularFeatureShopCheckoutComponent,
        canActivate: [AuthenticatedGuard],
        providers: [ProductDetailService],
      },
    ],
  },
];
