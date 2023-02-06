interface ContentfulSpaceEnv {
  /** Contentful Space ID */
  spaceId: string;

  /** Contentful Environment ID */
  environmentId: string;

  /** Content Delivery API - access token */
  cdaToken: string;

  /** Content Preview API - access token */
  cpaToken: string;

  /** Content Management API - access token */
  cmaToken: string;
}

export interface ContentfulEnv {
  /** Contentful GraphQL URI without Space ID */
  graphqlUri: string;
  /**
   * Unpublished content will be included
   * Docs: https://www.contentful.com/developers/docs/concepts/apis/
   */
  isPreview: boolean;
  website: ContentfulSpaceEnv;
}

export interface ContractsEnv {
  dehub: string;
  dehubBnb: string;
  wbnb: string;
  bnbBusd: string;
  busd: string;
  multiCall: string;
}

export interface Web3Env {
  /** Moralis configuration */
  moralis: {
    /** Application ID */
    appId: string;
    /** Server URL */
    serverUrl: string;
  };

  /** Default Network ChainId */
  chainId: number;
  addresses: { contracts: ContractsEnv };
  auth: {
    magicLinkApiKey: string;
  };
}

/**
 * Environment interface for shared environments
 * Used in Angular or React applications
 */
export interface SharedEnv {
  env: 'dev' | 'preview' | 'prod';
  production: boolean;

  /**
   * Base URL of the project under single domain.
   *
   * project.json build artifact:
   *   - deployUrl and baseHref should be in sync
   * service worker:
   *   - worker script path should be in sync
   */
  baseUrl: string;

  /** DeHUB URLs */
  dehub: {
    /** CEX trade */
    cexUrl: string;
    /** Download Metamask */
    downloadWalletUrl: string;
    /** Official DeHUB landing page */
    landing: string;
    /** Official DeHUB dapp pages */
    dapps: { staking: string };
  };

  contentful: ContentfulEnv;

  web3: Web3Env;

  emails: {
    shopSupport: string;
  };
}

/**
 * Default shared environment variables
 */
export const defaultSharedEnv: SharedEnv = {
  env: 'dev',
  production: false,
  baseUrl: '',

  dehub: {
    cexUrl: 'https://www.gate.io/trade/DEHUB_USDT',
    downloadWalletUrl: 'https://metamask.io/download/',
    landing: 'https://dehub.net',
    dapps: {
      staking: 'https://dehub.net/staking',
    },
  },

  contentful: {
    graphqlUri: 'https://graphql.contentful.com/content/v1/spaces',
    isPreview: false,
    website: {
      spaceId: '4jicnfvodfm8',
      environmentId: 'master',
      cdaToken: 'P-LDCxYvG6uzay9AVZP28I3usarvMw2mTPeDGqfxTVI',
      cpaToken: 'C__6WRbPa01sIs-K6MAWXGHJkIPTY0aS3_Fg9hGp9xY',
      cmaToken: 'CFPAT-qMiEgFb3Ctm12wkXELHdlY-G8ymODCEMYKvlevV0BX0',
    },
  },

  web3: {
    // DeHub Test
    moralis: {
      appId: 'UxvDeanBLvO8ym31e6x6dYdQa2Qlzw2jOSrhm3cE',
      serverUrl: 'https://nm6dir4me3i0.usemoralis.com:2053/server',
    },
    chainId: 97,
    addresses: {
      contracts: {
        dehub: '0xf571900aCe63Bc9b4C8F382bda9062232e4Ff477',
        dehubBnb: '0x21B7576349f8F2178C83A8C3fe0ca4492f488d5D',
        wbnb: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
        bnbBusd: '0xe0e92035077c39594793e61802a350347c320cf2',
        busd: '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
        multiCall: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576',
      },
    },
    auth: {
      magicLinkApiKey: 'pk_live_559E42CB7F45E462',
    },
  },

  emails: {
    shopSupport: 'tech@dehub.net',
  },
};
