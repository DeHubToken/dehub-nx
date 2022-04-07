import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFeatureMailingComponent } from './angular-feature-mailing.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'subscribe',
        component: AngularFeatureMailingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureLearnRoutingModule {}
