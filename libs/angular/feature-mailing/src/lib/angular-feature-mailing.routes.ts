import { Routes } from '@angular/router';
import { AngularFeatureMailingComponent } from './angular-feature-mailing.component';

export const routes: Routes = [
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
