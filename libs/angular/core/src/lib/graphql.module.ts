import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { InMemoryCache } from '@apollo/client/cache';
import { from } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { SharedEnv } from '@dehub/shared/config';
import { ApolloModule, APOLLO_FLAGS, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { GraphQLErrorExtensions } from 'graphql';
import { EnvToken } from './models/injection-token';

/**
 * Creating Apollo Client
 *
 * Apollo Angular Docs: https://apollo-angular.com/docs/get-started#installation-without-angular-schematics
 * Contentful Docs: https://www.contentful.com/developers/docs/references/graphql/#/introduction
 * Contentful Example: https://github.com/contentful/the-example-app.graphql.js/blob/master/src/index.js#L24
 */
export function createApollo(
  httpLink: HttpLink,
  {
    contentful: {
      graphqlUri,
      isPreview,
      website: { spaceId, cpaToken, cdaToken },
    },
  }: SharedEnv
) {
  return {
    link: from([
      onError(({ graphQLErrors, networkError, response }) => {
        /**
         * Check whether Contentful unresolved link error happen
         *
         * This happens if an entry is set to unpublish or not published yet,
         * but assigned to az existing other published entry.
         *
         * Only happens in case of preview mode on (prod + CDA).
         * In this case the draft entries wont't be retrieved,
         * but GQL response will contain data and also errors properties
         *
         * @param extError the Contentful extension error
         * @returns true in case of unpublished link error which cause unresolved entry in prod (CDA)
         */
        const isContentfulUnresolvableLink = (
          extError: GraphQLErrorExtensions
        ) =>
          (extError['contentful'] as { code: string }).code ===
          'UNRESOLVABLE_LINK';

        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path, extensions }) => {
            const isUnresolvedLinkError =
              isContentfulUnresolvableLink(extensions);

            const msg = `[GraphQL ${
              isUnresolvedLinkError ? 'warn' : 'error'
            }]: ${message}, Extension: ${JSON.stringify(
              extensions,
              undefined,
              ''
            )}, Location: ${locations}, Path: ${path}`;

            // Only show warnings in production for unresolved links
            isUnresolvedLinkError ? console.warn(msg) : console.error(msg);
          });

          // Ignore errors which are just contentful unresolved link related
          if (response && response.errors) {
            const remainingErrors = response.errors.filter(
              error => !isContentfulUnresolvableLink(error.extensions)
            );
            if (remainingErrors.length === 0) delete response.errors;
          }
        }
        if (networkError)
          console.error(
            `[Network error]: ${JSON.stringify(networkError, undefined, 1)}`
          );
      }),
      httpLink.create({
        uri: `${graphqlUri}/${spaceId}`,
        headers: new HttpHeaders({
          Authorization: `Bearer ${isPreview ? cpaToken : cdaToken}`,
        }),
      }),
    ]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  };
}

@NgModule({
  exports: [HttpClientModule, ApolloModule],
  providers: [
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
      deps: [HttpLink, EnvToken],
    },
  ],
})
export class GraphQLModule {}
