import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '@dehub/angular/core';
import { AngularFeatureShopCheckoutComponent } from './angular-feature-shop-checkout.component';
import { AngularFeatureShopProductDetailComponent } from './angular-feature-shop-product-detail.component';
import { AngularFeatureShopComponent } from './angular-feature-shop.component';

const routes: Routes = [
  {
    path: '',
    component: AngularFeatureShopComponent,
  },
  {
    path: ':slug',
    component: AngularFeatureShopProductDetailComponent,
  },
  {
    path: 'checkout',
    outlet: 'modal',
    children: [
      {
        path: ':slug',
        component: AngularFeatureShopCheckoutComponent,
        canActivate: [AuthenticatedGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureShopRoutingModule {}
