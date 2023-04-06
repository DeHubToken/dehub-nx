import { enableProdMode, importProvidersFrom } from '@angular/core';

import { APP_BASE_HREF, CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ServiceWorkerModule,
  SwRegistrationOptions,
} from '@angular/service-worker';
import { AngularCoreModule } from '@dehub/angular/core';
import { AngularGraphQLModule } from '@dehub/angular/graphql';
import { EnvToken } from '@dehub/angular/model';
import { AngularMoralisModule } from '@dehub/angular/moralis';
import { AnnouncementModule } from '@dehub/angular/ui/components/announcement';
import { ContentfulDraftDirectiveModule } from '@dehub/angular/ui/directives/contentful-draft';
import { DialogService } from 'primeng/dynamicdialog';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { MenuService } from './app/topbar/menu/app.menu.service';
import { Env } from './environments/env';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const { appId, serverUrl } = environment.web3.moralis;

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      // Angular
      CommonModule,
      BrowserModule,
      FormsModule,
      ServiceWorkerModule.register(`web/ngsw-worker.js`),

      // Optional feature modules
      AngularCoreModule.forRoot(),
      AngularMoralisModule.forRoot({ appId, serverUrl }),
      AngularGraphQLModule,

      // Libs
      AnnouncementModule,
      ContentfulDraftDirectiveModule,

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
