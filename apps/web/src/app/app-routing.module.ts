import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AppMainComponent } from './app.main.component';

enum Navigation {
  Components = 'components',
}

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AppMainComponent,
          children: [
            // { path: '', redirectTo: Navigation.Components, pathMatch: 'full' },
            {
              path: Navigation.Components,
              loadChildren: () =>
                import('./modules/components/components.module').then(
                  module => module.ComponentsModule
                ),
              data: {
                animation: Navigation.Components,
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
