import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFeatureGameComponent } from './angular-feature-game.component';

const routes: Routes = [
  {
    path: '',
    component: AngularFeatureGameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureGameRoutingModule {}
