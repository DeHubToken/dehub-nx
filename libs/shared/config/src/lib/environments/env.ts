import { InjectionToken } from '@angular/core';

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
export interface Env {
  env: string;
  production: boolean;

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
export const defaultEnv: Env = {
  env: '-',
  production: false,

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

export const ENV = new InjectionToken<Env>('DeHub Environment');
