import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
// import { MenuItem } from '@dehub/shared/model';
import { environment } from '../environments/environment';
import { AppMainComponent } from './app.main.component';

enum NavigationTabMenu {
  Home = 'home',
  Stream = 'stream',
  Game = 'game',
  Shop = 'shop',
  Learn = 'learn',
  Earn = 'earn',
  News = 'news',
  Legal = 'legal',
}

export const menuItems: MenuItem[] = [
  {
    label: 'Dapps',
    items: [
      {
        label: 'DeStake',
        url: environment.dehub.dapps.staking,
        icon: 'far fa-coins',
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
    label: 'Earn',
    icon: 'fad fa-coins',
    routerLink: [NavigationTabMenu.Earn],
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
              path: NavigationTabMenu.Earn,
              loadChildren: () =>
                import('@dehub/angular/feature-earn').then(
                  module => module.AngularFeatureEarnModule
                ),
            },
            {
              path: NavigationTabMenu.Legal,
              loadChildren: () =>
                import('@dehub/angular/feature-legal').then(
                  module => module.AngularFeatureLegalModule
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
