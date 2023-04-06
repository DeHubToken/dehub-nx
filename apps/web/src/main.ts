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

import { AngularCoreModule } from '@dehub/angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';
import { AngularMoralisModule } from '@dehub/angular/moralis';
import { AppRoutingModule } from './app/app-routing.module';

if (environment.production) {
  enableProdMode();
}

const { appId, serverUrl } = environment.web3.moralis;

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      // Angular
      ServiceWorkerModule.register(`web/ngsw-worker.js`),

      // Optional feature modules
      AngularCoreModule.forRoot(),
      AngularMoralisModule.forRoot({ appId, serverUrl }),
      AngularGraphQLModule,

      AppRoutingModule
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
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
}).catch(err => console.error(err));
