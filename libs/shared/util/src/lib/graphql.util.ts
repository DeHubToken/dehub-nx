import {
  ApolloClientOptions,
  createHttpLink,
  defaultDataIdFromObject,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ContentfulEnv } from '@dehub/shared/config';
import { SysFragment } from '@dehub/shared/model';
import { GraphQLErrorExtensions } from 'graphql';

export const createApolloClient = (
  {
    graphqlUri,
    isPreview,
    website: { spaceId, environmentId, cpaToken, cdaToken },
  }: ContentfulEnv,
  cache = createApolloCache()
): ApolloClientOptions<NormalizedCacheObject> => ({
  defaultOptions: {
    query: {
      /**
       * The default is 'cache-first'.
       * Docs: https://www.apollographql.com/docs/react/data/queries/#cache-first
       *  */
      fetchPolicy: 'cache-first',
    },
  },
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
      const isContentfulUnresolvableLink = (extError: GraphQLErrorExtensions) =>
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
    createHttpLink({
      uri: `${graphqlUri}/${spaceId}/environments/${environmentId}`,
      headers: {
        Authorization: `Bearer ${isPreview ? cpaToken : cdaToken}`,
      },
    }),
  ]),
  cache,
  connectToDevTools: true,
});

export const createApolloCache = (): InMemoryCache =>
  new InMemoryCache({
    dataIdFromObject(responseObject) {
      if (responseObject['sys']) {
        const { id } = responseObject['sys'] as SysFragment;
        return `${responseObject['__typename']}:${id}`;
      }
      return defaultDataIdFromObject(responseObject);
    },
  });
