import { Routes } from '@angular/router';
import { NavigationTabMenu } from '@dehub/shared/model';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.main.component'),
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
        loadChildren: () => import('@dehub/angular/feature-game'),
      },
      {
        path: NavigationTabMenu.Shop,
        loadChildren: () => import('@dehub/angular/feature-shop'),
      },
      {
        path: NavigationTabMenu.Learn,
        loadChildren: () => import('@dehub/angular/feature-learn'),
      },
      {
        path: NavigationTabMenu.News,
        loadChildren: () => import('@dehub/angular/feature-news'),
      },
      {
        path: NavigationTabMenu.Clubs,
        loadChildren: () => import('@dehub/angular/feature-clubs'),
      },
      {
        path: NavigationTabMenu.Legal,
        loadChildren: () => import('@dehub/angular/feature-legal'),
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
