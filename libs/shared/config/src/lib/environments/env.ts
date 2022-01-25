interface ContentfulEnv {
  /** Contentful Space ID */
  spaceId: string;

  /** Content Delivery API - access token */
  cdaToken: string;

  /** Content Preview API - access token */
  cpaToken: string;
}

interface NetworkEnv {
  chainId: number;
  chainIdHex: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  nodes: string[];
  rpcUrl: string;
  blockExplorerUrl: string;
}

interface ContractsEnv {
  dehub: string;
  dehubBnb: string;
  bnb: string;
  bnbBusd: string;
  busd: string;
  multiCall: string;
}

interface Web3Env {
  networks: { bsc: NetworkEnv };
  addresses: { contracts: ContractsEnv };
}

/**
 * Environment interface for shared environments
 * Used in Angular or React applications
 */
export interface SharedEnv {
  env: 'dev' | 'prod';
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

  web3: Web3Env;
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

  web3: {
    networks: {
      bsc: {
        chainId: 97,
        chainIdHex: '0x61',
        chainName: 'Binance Smart Chain Testnet',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'bnb',
          decimals: 18,
        },
        rpcUrl: 'https://data-seed-prebsc-2-s2.binance.org:8545/',
        blockExplorerUrl: 'https://testnet.bscscan.com',
        nodes: [
          'https://speedy-nodes-nyc.moralis.io/6b2569937eb2e5cb5996d2dc/bsc/mainnet',
          'https://bsc-dataseed1.defibit.io/',
          'https://bsc-dataseed1.ninicoin.io/',
        ],
      },
    },
    addresses: {
      contracts: {
        dehub: '0x5aac501a81d9e4f173c4215ecd4315072c6c40b2',
        dehubBnb: '0x21B7576349f8F2178C83A8C3fe0ca4492f488d5D',
        bnb: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
        bnbBusd: '0xe0e92035077c39594793e61802a350347c320cf2',
        busd: '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
        multiCall: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576',
      },
    },
  },
};
