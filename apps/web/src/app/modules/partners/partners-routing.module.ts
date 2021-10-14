import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnersHomeComponent } from './partners-home.component';

const routes: Routes = [
  {
    path: '',
    component: PartnersHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnersRoutingModule {}
