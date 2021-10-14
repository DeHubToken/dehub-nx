import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AppMainComponent } from './app.main.component';
import { LandingComponent } from './view/landing.component';

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
              path: 'features',
              loadChildren: () =>
                import('./modules/features/features.module').then(
                  module => module.FeaturesModule
                ),
            },
            {
              path: 'dehub',
              loadChildren: () =>
                import('./modules/dehub/dehub.module').then(
                  module => module.DehubModule
                ),
            },
            {
              path: 'partners',
              loadChildren: () =>
                import('./modules/partners/partners.module').then(
                  module => module.PartnersModule
                ),
            },
            {
              path: 'team',
              loadChildren: () =>
                import('./modules/team/team.module').then(
                  module => module.TeamModule
                ),
            },
            {
              path: 'contract',
              loadChildren: () =>
                import('./modules/contract/contract.module').then(
                  module => module.ContractModule
                ),
            },
            {
              path: 'dapps',
              loadChildren: () =>
                import('./modules/dapps/dapps.module').then(
                  module => module.DappsModule
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
