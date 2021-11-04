import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { InMemoryCache } from '@apollo/client/cache';
import { from } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { Env, ENV } from '@dehub/shared/config';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

/**
 * Creating Apollo Client
 *
 * Apollo Angular Docs: https://apollo-angular.com/docs/get-started#installation-without-angular-schematics
 * Contentful Docs: https://www.contentful.com/developers/docs/references/graphql/#/introduction
 * Contentful Example: https://github.com/contentful/the-example-app.graphql.js/blob/master/src/index.js#L24
 *
 */
export function createApollo(
  httpLink: HttpLink,
  {
    contentful: {
      graphqlUri,
      isPreview,
      website: { spaceId, cpaToken, cdaToken },
    },
  }: Env
) {
  return {
    link: from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.error(
              `[GraphQL error]: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
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
  exports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, ENV],
    },
  ],
})
export class GraphQLModule {}
