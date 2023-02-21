import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { InMemoryCache } from '@apollo/client/cache';
import {
  ApolloClientOptions,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { ApolloCacheToken, EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { createApolloCache, createApolloClient } from '@dehub/shared/utils';
import { ApolloModule, APOLLO_FLAGS, APOLLO_OPTIONS } from 'apollo-angular';

/**
 * Creating Apollo Client
 *
 * Apollo Angular Docs: https://apollo-angular.com/docs/get-started#installation-without-angular-schematics
 * Contentful Docs: https://www.contentful.com/developers/docs/references/graphql/#/introduction
 * Contentful Example: https://github.com/contentful/the-example-app.graphql.js/blob/master/src/index.js#L24
 */
export function createApollo(
  cache: InMemoryCache,
  { contentful }: SharedEnv
): ApolloClientOptions<NormalizedCacheObject> {
  return createApolloClient(contentful, cache);
}

@NgModule({
  exports: [HttpClientModule, ApolloModule],
  providers: [
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
      useFactory: createApollo,
      deps: [ApolloCacheToken, EnvToken],
    },
  ],
})
export class AngularGraphQLModule {}
