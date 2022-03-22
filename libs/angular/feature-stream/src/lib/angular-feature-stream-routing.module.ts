import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFeatureStreamComponent } from './angular-feature-stream.component';
import { StreamAccessWallComponent } from './components/stream-access-wall.component';
import { CanPlayGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: AngularFeatureStreamComponent,
    canActivate: [CanPlayGuard],
  },
  {
    path: 'access-wall',
    component: StreamAccessWallComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularFeatureStreamRoutingModule {}
