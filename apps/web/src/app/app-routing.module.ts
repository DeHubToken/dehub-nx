import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
// import { MenuItem } from '@dehub/shared/model';
import { environment } from '../environments/environment';
import { AppMainComponent } from './app.main.component';

enum NavigationMenu {
  Demos = 'demos',
  Tournaments = 'tournaments',
  Staking = 'staking',
}

enum NavigationTabMenu {
  Home = 'home',
  Stream = 'stream',
}

export const menuItems: MenuItem[] = [
  {
    label: 'Dapps',
    items: [
      {
        label: 'DeGame',
        routerLink: [NavigationMenu.Tournaments],
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
        routerLink: [NavigationMenu.Demos],
        icon: 'fa fa-puzzle-piece',
      },
    ],
  },
];

export const tabMenuItems: MenuItem[] = [
  {
    label: 'Home',
    icon: 'fa fa-home-alt',
    routerLink: [NavigationTabMenu.Home],
    // routerLinkActiveOptions: '{ exact: true }',
  },
  {
    label: 'Stream',
    icon: 'fa fa-stream',
    routerLink: [NavigationTabMenu.Stream],
    // routerLinkActiveOptions: '{ exact: true }',
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
            { path: '', redirectTo: NavigationTabMenu.Home, pathMatch: 'full' },
            {
              path: NavigationMenu.Demos,
              loadChildren: () =>
                import('./modules/demos/demos.module').then(
                  module => module.DemosModule
                ),
            },
            {
              path: NavigationMenu.Tournaments,
              loadChildren: () =>
                import('./modules/tournaments/tournaments.module').then(
                  module => module.TournamentsModule
                ),
            },
            {
              path: NavigationTabMenu.Home,
              loadChildren: () =>
                import('@dehub/angular/feature-home').then(
                  module => module.AngularFeatureHomeModule
                ),
            },
            {
              path: NavigationTabMenu.Stream,
              loadChildren: () =>
                import('@dehub/angular/feature-stream').then(
                  module => module.AngularFeatureStreamModule
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
