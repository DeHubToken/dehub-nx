import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFeatureStreamComponent } from './angular-feature-stream.component';

const routes: Routes = [
  {
    path: '',
    component: AngularFeatureStreamComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureStreamRoutingModule {}
