import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
// import { MenuItem } from '@dehub/shared/model';
import { environment } from '../environments/environment';
import { AppMainComponent } from './app.main.component';

export enum Navigation {
  Demos = 'demos',
  Tournaments = 'tournaments',
  Staking = 'staking',
  Home = 'home',
}

export const menuItems: MenuItem[] = [
  {
    label: 'Dapps',
    items: [
      {
        label: 'DeGame',
        routerLink: [Navigation.Tournaments],
        icon: 'fa fa-trophy-alt',
      },
      {
        label: 'DeStake',
        url: environment.dehub.dapps.staking,
        icon: 'far fa-coins',
      },
    ],
  },
  {
    label: 'Demo',
    visible: environment.env === 'dev',
    items: [
      {
        label: 'Contentful Team',
        routerLink: [Navigation.Demos],
        icon: 'fa fa-puzzle-piece',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AppMainComponent,
          children: [
            { path: '', redirectTo: Navigation.Home, pathMatch: 'full' },
            {
              path: Navigation.Demos,
              loadChildren: () =>
                import('./modules/demos/demos.module').then(
                  module => module.DemosModule
                ),
            },
            {
              path: Navigation.Tournaments,
              loadChildren: () =>
                import('./modules/tournaments/tournaments.module').then(
                  module => module.TournamentsModule
                ),
            },
            {
              path: Navigation.Home,
              loadChildren: () =>
                import('./modules/home/home.module').then(
                  module => module.HomeModule
                ),
            },
          ],
        },
        { path: '**', redirectTo: '' },
      ],
      {
        // Preload all Lazy modules while the user start navigating the app
        preloadingStrategy: PreloadAllModules,
        // The scroll position needs to be restored when navigating back
        scrollPositionRestoration: 'enabled',
        initialNavigation: 'enabledBlocking',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
