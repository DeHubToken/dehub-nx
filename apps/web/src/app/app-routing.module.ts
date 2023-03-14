import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { PwaService } from '@dehub/angular/core';
import { NavigationTabMenu } from '@dehub/shared/model';
import { MenuItem } from 'primeng/api';
import { environment } from '../environments/environment';
import { AppMainComponent } from './app.main.component';

export const getMenuItems = (pwaService: PwaService): MenuItem[] => [
  {
    label: 'Dapps',
    items: [
      {
        label: 'DeStake',
        url: environment.dehub.dapps.staking,
        icon: 'far fa-coins',
      },
      {
        label: 'Test Mailing Modal',
        routerLink: ['/', { outlets: { modal: ['mailing', 'subscribe'] } }],
        icon: 'far fa-link',
      },
      {
        label: 'Test Auth Modals',
        icon: 'far fa-key',
        items: [
          {
            label: 'Auth Request',
            routerLink: ['/', { outlets: { modal: ['auth'] } }],
          },
          {
            label: 'Auth Connect',
            routerLink: ['/', { outlets: { modal: ['auth', 'connect'] } }],
          },
          {
            label: 'Auth Disconnect',
            routerLink: ['/', { outlets: { modal: ['auth', 'disconnect'] } }],
          },
          {
            label: 'Auth Connected',
            routerLink: ['/', { outlets: { modal: ['auth', 'connected'] } }],
          },
        ],
      },
      {
        label: 'Test PWA Info Toast',
        command: () => pwaService.triggerSwUpdateAvailable('info', 'xxxx'),
        icon: 'fa-regular fa-circle-exclamation',
      },
      {
        label: 'Test PWA Warn Toast',
        command: () => pwaService.triggerSwUpdateAvailable('warn', 'xxxx'),
        icon: 'fa-regular fa-triangle-exclamation',
      },
    ],
  },
];

export const tabMenuItems: MenuItem[] = [
  {
    label: 'Home',
    icon: 'fad fa-home',
    routerLink: [NavigationTabMenu.Home],
  },
  {
    label: 'Stream',
    icon: 'fad fa-tv',
    routerLink: [NavigationTabMenu.Stream],
  },
  {
    label: 'Game',
    icon: 'fad fa-gamepad-alt',
    routerLink: [NavigationTabMenu.Game],
  },
  {
    label: 'Shop',
    icon: 'fad fa-shopping-bag',
    routerLink: [NavigationTabMenu.Shop],
  },
  {
    label: 'Learn',
    icon: 'fad fa-lightbulb-on',
    routerLink: [NavigationTabMenu.Learn],
  },
  {
    label: 'Clubs',
    icon: 'fad fa-people-group',
    routerLink: [NavigationTabMenu.Clubs],
  },
];

/**
 * Router extra options
 * Docs: https://angular.io/api/router/ExtraOptions
 */
const routerExtraOptions: ExtraOptions = {
  /**
   * Preload all Lazy modules while the user start navigating the app
   * Docs :https://angular.io/api/router/ExtraOptions#preloadingStrategy
   */
  preloadingStrategy: PreloadAllModules,

  /**
   * The scroll position needs to be restored when navigating back
   * Docs: https://angular.io/api/router/ExtraOptions#scrollPositionRestoration
   */
  scrollPositionRestoration: 'enabled',

  /** https://angular.io/api/router/InMemoryScrollingOptions#anchorScrolling */
  anchorScrolling: 'enabled',

  /** https://angular.io/api/router/ExtraOptions#initialNavigation */
  initialNavigation: 'enabledBlocking',

  /** https://angular.io/api/router/ExtraOptions#onSameUrlNavigation */
  // onSameUrlNavigation: 'reload',
};
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
              loadChildren: () =>
                import('@dehub/angular/feature-mailing').then(
                  module => module.AngularFeatureMailingModule
                ),
              outlet: 'modal',
            },
            {
              path: 'auth',
              loadChildren: () =>
                import('@dehub/angular/feature-auth').then(
                  module => module.AngularFeatureAuthModule
                ),
              outlet: 'modal',
            },
          ],
        },
        { path: '**', redirectTo: '' },
      ],
      {
        ...routerExtraOptions,
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
