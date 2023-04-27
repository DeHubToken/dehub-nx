import { Routes } from '@angular/router';
import { AngularFeatureLegalComponent } from './angular-feature-legal.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'terms',
    pathMatch: 'full',
  },
  {
    path: ':slug',
    component: AngularFeatureLegalComponent,
  },
];
