import { enableProdMode, importProvidersFrom } from '@angular/core';

import { APP_BASE_HREF } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EnvToken } from '@dehub/angular/model';

import {
  ServiceWorkerModule,
  SwRegistrationOptions,
} from '@angular/service-worker';
import { DialogService } from 'primeng/dynamicdialog';
import { AppComponent } from './app/app.component';
import { MenuService } from './app/topbar/menu/app.menu.service';
import { Env } from './environments/env';
import { environment } from './environments/environment';

import {
  PreloadAllModules,
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { AngularCoreModule } from '@dehub/angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';
import { AngularMoralisModule } from '@dehub/angular/moralis';
import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

const { appId, serverUrl } = environment.web3.moralis;

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      /**
       * Preload all Lazy modules while the user start navigating the app
       * Docs :https://angular.io/api/router/ExtraOptions#preloadingStrategy
       */
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({
        /**
         * The scroll position needs to be restored when navigating back
         * Docs: https://angular.io/api/router/ExtraOptions#scrollPositionRestoration
         */
        scrollPositionRestoration: 'enabled',
        /** https://angular.io/api/router/InMemoryScrollingOptions#anchorScrolling */
        anchorScrolling: 'enabled',
      }),
      /** https://angular.io/api/router/ExtraOptions#initialNavigation */
      withEnabledBlockingInitialNavigation()
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),

    importProvidersFrom(
      // Angular
      ServiceWorkerModule.register(`web/ngsw-worker.js`),

      // Optional feature modules
      AngularCoreModule.forRoot(),
      AngularMoralisModule.forRoot({ appId, serverUrl }),
      AngularGraphQLModule
    ),

    MenuService,
    DialogService,
    { provide: EnvToken, useValue: environment },
    {
      provide: APP_BASE_HREF,
      useFactory: ({ baseUrl }: Env) => baseUrl,
      deps: [EnvToken],
    },
    {
      provide: SwRegistrationOptions,
      useFactory: ({ production, baseUrl }: Env) => ({
        enabled: production,
        ...(production && { scope: `${baseUrl}/` }),
        /**
         * Register the ServiceWorker as soon as the app is stable
         * or after 30 seconds (whichever comes first)
         */
        registrationStrategy: 'registerWhenStable:30000',
      }),
      deps: [EnvToken],
    },
  ],
}).catch(err => console.error(err));
