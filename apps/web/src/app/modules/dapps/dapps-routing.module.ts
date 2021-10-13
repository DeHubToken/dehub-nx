import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DappsHomeComponent } from './dapps-home.component';

const routes: Routes = [
  {
    path: '',
    component: DappsHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DappsRoutingModule {}
