import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimHomeComponent } from './claim-home.component';

const routes: Routes = [
  {
    path: '',
    component: ClaimHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimRoutingModule {}
