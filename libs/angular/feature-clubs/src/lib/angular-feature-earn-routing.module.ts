import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFeatureClubsComponent } from './angular-feature-earn.component';

const routes: Routes = [
  {
    path: '',
    component: AngularFeatureClubsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureClubsRoutingModule {}
