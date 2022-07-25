import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '@dehub/angular/core';
import { AngularFeatureShopCheckoutComponent } from './angular-feature-shop-checkout.component';
import { AngularFeatureShopProductDetailComponent } from './angular-feature-shop-product-detail.component';
import { AngularFeatureShopComponent } from './angular-feature-shop.component';
import { ProductDetailResolver } from './services/product-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AngularFeatureShopComponent,
  },
  {
    path: ':slug',
    component: AngularFeatureShopProductDetailComponent,
    resolve: { productDetail: ProductDetailResolver },
  },
  {
    path: 'checkout',
    outlet: 'modal',
    children: [
      {
        path: ':slug',
        component: AngularFeatureShopCheckoutComponent,
        resolve: { productDetail: ProductDetailResolver },
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
