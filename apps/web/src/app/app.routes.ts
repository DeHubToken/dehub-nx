import { Routes } from '@angular/router';
import { NavigationTabMenu } from '@dehub/shared/model';
import { AppMainComponent } from './app.main.component';

export const routes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    children: [
      { path: '', redirectTo: NavigationTabMenu.Home, pathMatch: 'full' },
      {
        path: NavigationTabMenu.Home,
        loadChildren: () => import('@dehub/angular/feature-home'),
      },
      {
        path: NavigationTabMenu.Stream,
        loadChildren: () => import('@dehub/angular/feature-stream'),
      },
      {
        path: NavigationTabMenu.Game,
        loadChildren: () =>
          import('@dehub/angular/feature-game').then(
            module => module.AngularFeatureGameModule
          ),
      },
      {
        path: NavigationTabMenu.Shop,
        loadChildren: () =>
          import('@dehub/angular/feature-shop').then(
            module => module.AngularFeatureShopModule
          ),
      },
      {
        path: NavigationTabMenu.Learn,
        loadChildren: () =>
          import('@dehub/angular/feature-learn').then(
            module => module.AngularFeatureLearnModule
          ),
      },
      {
        path: NavigationTabMenu.News,
        loadChildren: () =>
          import('@dehub/angular/feature-news').then(
            module => module.AngularFeatureNewsModule
          ),
      },
      {
        path: NavigationTabMenu.Clubs,
        loadChildren: () =>
          import('@dehub/angular/feature-clubs').then(
            module => module.AngularFeatureClubsModule
          ),
      },
      {
        path: NavigationTabMenu.Legal,
        loadChildren: () =>
          import('@dehub/angular/feature-legal').then(
            module => module.AngularFeatureLegalModule
          ),
      },
      {
        path: 'mailing',
        loadChildren: () => import('@dehub/angular/feature-mailing'),
        outlet: 'modal',
      },
      {
        path: 'auth',
        loadChildren: () => import('@dehub/angular/feature-auth'),
        outlet: 'modal',
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
