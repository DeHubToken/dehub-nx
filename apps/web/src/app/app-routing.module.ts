import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AppMainComponent } from './app.main.component';
import { LandingViewComponent } from './view/landing/landing-view.component';

enum Navigation {
  Claim = 'claim',
}

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AppMainComponent,
          children: [
            { path: '', component: LandingViewComponent },
            {
              path: Navigation.Claim,
              loadChildren: () =>
                import('./modules/claim/claim.module').then(
                  module => module.ClaimModule
                ),
              data: {
                animation: Navigation.Claim,
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
