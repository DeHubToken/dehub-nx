import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFeatureLegalDetailComponent } from './angular-feature-legal-detail.component';
import { AngularFeatureLegalComponent } from './angular-feature-legal.component';

const routes: Routes = [
  {
    path: '',
    component: AngularFeatureLegalComponent,
  },
  {
    path: ':slug',
    component: AngularFeatureLegalDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureLegalRoutingModule {}
