import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFeatureShopComponent } from '././angular-feature-shop.component';

const routes: Routes = [
  {
    path: '',
    component: AngularFeatureShopComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureShopRoutingModule {}
