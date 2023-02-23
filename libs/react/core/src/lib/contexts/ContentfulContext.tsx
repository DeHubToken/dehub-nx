import { ApolloClient, ApolloProvider } from '@apollo/client';
import { ContentfulEnv } from '@dehub/shared/config';
import { FooterFragment } from '@dehub/shared/model';
import { createApolloClient } from '@dehub/shared/utils';
import React, { createContext, PropsWithChildren, useMemo } from 'react';
import { useFooterCollectionQuery } from '../hooks';

interface ContentfulContextProps {
  loading: boolean;
  footer?: FooterFragment;
}

const ContentfulContext = createContext<undefined | ContentfulContextProps>(
  undefined
);

interface ContentfulApolloProps extends PropsWithChildren<unknown> {
  contentful: ContentfulEnv;
}

const ContentfulApollo: React.FC<ContentfulApolloProps> = ({
  children,
  contentful,
}) => {
  const client = useMemo(
    () => new ApolloClient(createApolloClient(contentful)),
    [contentful]
  );

  return (
    <ApolloProvider client={client}>
      <ContentfulProvider isPreview={contentful.isPreview}>
        {children}
      </ContentfulProvider>
    </ApolloProvider>
  );
};

interface ContentfulProviderProps extends PropsWithChildren<unknown> {
  isPreview: boolean;
}

const ContentfulProvider: React.FC<ContentfulProviderProps> = ({
  children,
  isPreview,
}) => {
  const { data, loading, error } = useFooterCollectionQuery({
    variables: { isPreview },
  });

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
    <ContentfulContext.Provider
      value={{
        loading,
        footer,
      }}
    >
      {children}
    </ContentfulContext.Provider>
  );
};

export { ContentfulContext, ContentfulApollo as ContentfulProvider };
