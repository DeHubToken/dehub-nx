import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFeatureEarnComponent } from './angular-feature-earn.component';

const routes: Routes = [
  {
    path: '',
    component: AngularFeatureEarnComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureEarnRoutingModule {}
