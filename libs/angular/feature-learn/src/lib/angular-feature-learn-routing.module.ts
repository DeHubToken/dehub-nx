import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFeatureLearnComponent } from './angular-feature-learn.component';

const routes: Routes = [
  {
    path: '',
    component: AngularFeatureLearnComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureLearnRoutingModule {}
