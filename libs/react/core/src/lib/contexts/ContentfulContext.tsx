import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { Contentful } from '@dehub/shared/config';
import { FooterFragment } from '@dehub/shared/model';
import { createContext, ReactNode, useMemo } from 'react';
import { useFooterCollectionQuery } from '../hooks';

interface ContentfulContextProps {
  loading: boolean;
  footer?: FooterFragment;
}

const ContentfulConext = createContext<undefined | ContentfulContextProps>(
  undefined
);

interface ContentfulProviderProps {
  children?: ReactNode;
  contentful: Contentful;
}

const ContentfulApollo = ({
  children,
  contentful: {
    graphqlUri,
    isPreview,
    website: { spaceId, cpaToken, cdaToken },
  },
}: ContentfulProviderProps) => {
  const client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: `${graphqlUri}/${spaceId}`,
      headers: {
        Authorization: `Bearer ${isPreview ? cpaToken : cdaToken}`,
      },
    });

    const client = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });

    return client;
  }, [graphqlUri, isPreview, spaceId, cpaToken, cdaToken]);

  return (
    <ApolloProvider client={client}>
      <ContentfulProvider>{children}</ContentfulProvider>
    </ApolloProvider>
  );
};

const ContentfulProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading, error } = useFooterCollectionQuery();

  const footer = useMemo(() => {
    if (loading || error) {
      return undefined;
    }

    return (
      data?.footerCollection?.items &&
      (data.footerCollection.items[0] as FooterFragment)
    );
  }, [data, loading, error]);

  return (
    <ContentfulConext.Provider
      value={{
        loading,
        footer,
      }}
    >
      {children}
    </ContentfulConext.Provider>
  );
};

export { ContentfulConext, ContentfulApollo as ContentfulProvider };
