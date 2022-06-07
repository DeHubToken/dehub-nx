import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFeatureLegalComponent } from './angular-feature-legal.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'terms',
    pathMatch: 'full',
  },
  {
    path: ':slug',
    component: AngularFeatureLegalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureLegalRoutingModule {}
