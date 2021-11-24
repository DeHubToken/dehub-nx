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
  env: string;
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
}

/**
 * Default shared environment variables
 */
export const defaultSharedEnv: SharedEnv = {
  env: '-',
  production: false,
  baseUrl: '',

  contentful: {
    graphqlUri: 'https://graphql.contentful.com/content/v1/spaces',
    isPreview: false,
    website: {
      spaceId: '4jicnfvodfm8',
      cdaToken: 'pmOsfUcVSGtQhB0Qo35kJF9lqL4V5R4yH-xACKCJIw8',
      cpaToken: 'HvmEh8YWfWNGKRzTSYDf-tIR93Rs8FjyKkH56c0svgo',
    },
  },
};
