import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFeatureShopComponent } from '././angular-feature-shop.component';
import { AngularFeatureShopProductDetailComponent } from './angular-feature-shop-product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AngularFeatureShopComponent,
  },
  {
    path: ':slug',
    component: AngularFeatureShopProductDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureShopRoutingModule {}
