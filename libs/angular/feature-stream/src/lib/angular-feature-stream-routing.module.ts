import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFeatureStreamComponent } from './angular-feature-stream.component';
import { CanPlayGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: AngularFeatureStreamComponent,
    canActivate: [CanPlayGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureStreamRoutingModule {}
