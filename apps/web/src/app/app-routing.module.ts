import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AppMainComponent } from './app.main.component';
import { LandingComponent } from './view/landing.component';

enum Navigation {
  Features = 'features',
  Dehub = 'dehub',
  Partners = 'partners',
  Team = 'team',
  Contract = 'contract',
  Dapps = 'dapps',
}

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AppMainComponent,
          children: [
            { path: '', component: LandingComponent },
            {
              path: Navigation.Partners,
              loadChildren: () =>
                import('./modules/features/features.module').then(
                  module => module.FeaturesModule
                ),
              data: {
                animation: Navigation.Partners,
              },
            },
            {
              path: Navigation.Dehub,
              loadChildren: () =>
                import('./modules/dehub/dehub.module').then(
                  module => module.DehubModule
                ),
              data: {
                animation: Navigation.Dehub,
              },
            },
            {
              path: Navigation.Partners,
              loadChildren: () =>
                import('./modules/partners/partners.module').then(
                  module => module.PartnersModule
                ),
              data: {
                animation: Navigation.Partners,
              },
            },
            {
              path: Navigation.Team,
              loadChildren: () =>
                import('./modules/team/team.module').then(
                  module => module.TeamModule
                ),
              data: {
                animation: Navigation.Team,
              },
            },
            {
              path: Navigation.Contract,
              loadChildren: () =>
                import('./modules/contract/contract.module').then(
                  module => module.ContractModule
                ),
              data: {
                animation: Navigation.Contract,
              },
            },
            {
              path: Navigation.Dapps,
              loadChildren: () =>
                import('./modules/dapps/dapps.module').then(
                  module => module.DappsModule
                ),
              data: {
                animation: Navigation.Dapps,
              },
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
