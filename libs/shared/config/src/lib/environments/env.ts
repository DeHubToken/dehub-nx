interface ContentfulEnv {
  /** Contentful Space ID */
  spaceId: string;

  /** Content Delivery API - access token */
  cdaToken: string;

  /** Content Preview API - access token */
  cpaToken: string;
}

/**
 * Environment interface for shared environments
 * Used in Angular or React applications
 */
export interface SharedEnv {
  env: 'dev' | 'prod';
  production: boolean;

  /**
   * Base URL of the project under sinßgle domain.
   *
   * project.json build artifact:
   *   - deployUrl and baseHref should be in sync
   * service worker:
   *   - worker script path should be in sync
   */
  baseUrl: string;

  /** DeHUB URLs */
  dehub: {
    /** Official DeHUB landing page */
    landing: string;
    /** Official DeHUB dapp pages */
    dapps: { landing: string };
  };

  contentful: {
    /** Contentful GraphQL URI without Space ID */
    graphqlUri: string;
    /**
     * Unpublished content will be included
     * Docs: https://www.contentful.com/developers/docs/concepts/apis/
     */
    isPreview: boolean;
    website: ContentfulEnv;
  };

  /** Moralis configuration */
  moralis: {
    /** Application ID */
    appId: string;
    /** Server URL */
    serverUrl: string;
  };

  /** BSC network nodes */
  bscNodes: string[];
}

/**
 * Default shared environment variables
 */
export const defaultSharedEnv: SharedEnv = {
  env: 'dev',
  production: false,
  baseUrl: '',

  dehub: {
    landing: 'https://dehub.net',
    dapps: {
      landing: 'https://dapps.dehub.net',
    },
  },

  contentful: {
    graphqlUri: 'https://graphql.contentful.com/content/v1/spaces',
    isPreview: false,
    website: {
      spaceId: '4jicnfvodfm8',
      cdaToken: 'pmOsfUcVSGtQhB0Qo35kJF9lqL4V5R4yH-xACKCJIw8',
      cpaToken: 'HvmEh8YWfWNGKRzTSYDf-tIR93Rs8FjyKkH56c0svgo',
    },
  },

  moralis: {
    appId: 'QfgYJskOXrYJnSAiB3KZPMMesmlJB6JBqY3GOzHV',
    serverUrl: 'https://vamoxwojj7ht.moralisweb3.com:2053/server',
  },

  bscNodes: [
    'https://speedy-nodes-nyc.moralis.io/6b2569937eb2e5cb5996d2dc/bsc/mainnet',
    'https://bsc-dataseed1.defibit.io/',
    'https://bsc-dataseed1.ninicoin.io/',
  ],
};
