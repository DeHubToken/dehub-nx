import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DehubHomeComponent } from './dehub-home.component';

const routes: Routes = [
  {
    path: '',
    component: DehubHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DehubRoutingModule {}
