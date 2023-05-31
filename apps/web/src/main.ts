import { APP_BASE_HREF } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  APP_INITIALIZER,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import {
  ServiceWorkerModule,
  SwRegistrationOptions,
} from '@angular/service-worker';
import { InMemoryCache } from '@apollo/client/cache';
import {
  ApolloClientOptions,
  NormalizedCacheObject,
} from '@apollo/client/core';
import {
  CoingeckoService,
  ConsoleLoggerService,
  ContentfulManagementService,
  DehubMoralisService,
  MoralisService,
} from '@dehub/angular/core';
import {
  ApolloCacheToken,
  CoingeckoToken,
  ContentfulManagementToken,
  DehubMoralisToken,
  EnvToken,
  ILoggerService,
  LoggerContentfulToken,
  LoggerDehubMoralisToken,
  LoggerDehubToken,
  LoggerMoralisToken,
  MoralisToken,
} from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/model';
import { createApolloCache, createApolloClient } from '@dehub/shared/utils';
import { APOLLO_FLAGS, APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { Moralis } from 'moralis';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { register } from 'swiper/element/bundle';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { Env } from './environments/env';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const { appId, serverUrl } = environment.web3.moralis;

// Register Swiper custom elements
register();

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      /**
       * Preload all Lazy modules while the user start navigating the app
       * Docs: https://angular.io/api/router/ExtraOptions#preloadingStrategy
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

    // TODO: use provideXXX when available
    importProvidersFrom(
      // Angular
      ServiceWorkerModule.register(`web/ngsw-worker.js`),

      // GraphQL
      ApolloModule
    ),

    // PrimeNG
    MessageService,
    ConfirmationService,
    DialogService,

    { provide: EnvToken, useValue: environment },
    {
      provide: APP_BASE_HREF,
      useFactory: ({ baseUrl }: Env) => baseUrl,
      deps: [EnvToken],
    },

    // GraphQL
    {
      provide: ApolloCacheToken,
      useValue: createApolloCache(),
    },
    {
      provide: APOLLO_FLAGS,
      useValue: {
        // https://github.com/kamilkisiela/apollo-angular/blob/master/website/docs/data/queries.md#loading-state
        useInitialLoading: true,
        useMutationLoading: true,
      },
    },
    {
      provide: APOLLO_OPTIONS,
      /**
       * Creating Apollo Client
       *
       * Apollo Angular Docs: https://apollo-angular.com/docs/get-started#installation-without-angular-schematics
       * Contentful Docs: https://www.contentful.com/developers/docs/references/graphql/#/introduction
       * Contentful Example: https://github.com/contentful/the-example-app.graphql.js/blob/master/src/index.js#L24
       */
      useFactory: (
        cache: InMemoryCache,
        { contentful }: SharedEnv
      ): ApolloClientOptions<NormalizedCacheObject> =>
        createApolloClient(contentful, cache),
      deps: [ApolloCacheToken, EnvToken],
    },

    // Moralis
    {
      provide: APP_INITIALIZER,
      useFactory: (logger: ILoggerService) => () =>
        /**
         * Initialize the SDK
         * Docs: https://docs.moralis.io/moralis-server/getting-started/connect-the-sdk#initialize-the-sdk
         **/
        Moralis.start({ appId, serverUrl }).then(() =>
          logger.debug('Moralis has been initialized.')
        ),
      multi: true,
      deps: [LoggerMoralisToken],
    },
    { provide: MoralisToken, useClass: MoralisService },
    { provide: DehubMoralisToken, useClass: DehubMoralisService },

    // Contentful
    {
      provide: ContentfulManagementToken,
      useClass: ContentfulManagementService,
    },

    // Coingecko
    {
      provide: CoingeckoToken,
      useClass: CoingeckoService,
    },

    // Loggers
    // Default Dehub Logger
    {
      provide: LoggerDehubToken,
      useFactory: (env: SharedEnv) => new ConsoleLoggerService('', env),
      deps: [EnvToken],
    },
    // Moralis Logger
    {
      provide: LoggerMoralisToken,
      useFactory: (env: SharedEnv) => new ConsoleLoggerService('Moralis', env),
      deps: [EnvToken],
    },
    // Dehub Moralis Logger
    {
      provide: LoggerDehubMoralisToken,
      useFactory: (env: SharedEnv) =>
        new ConsoleLoggerService('Dehub Moralis', env),
      deps: [EnvToken],
    },
    // Contentful Logger
    {
      provide: LoggerContentfulToken,
      useFactory: (env: SharedEnv) =>
        new ConsoleLoggerService('Contentful', env),
      deps: [EnvToken],
    },

    // PWA
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
