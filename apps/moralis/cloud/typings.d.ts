declare const { BigNumber }: typeof import('@ethersproject/bignumber');
declare const { Web3Provider }: typeof import('@ethersproject/providers');

declare namespace MoralisMissingTypes {
  declare namespace Moralis {
    declare namespace Cloud {
      function getLogger(): {
        info: (error: string) => void;
        warn: (error: string) => void;
        error: (error: string) => void;
      };

      const BigNumber: BigNumber;

      function toIpfs({
        sourceType,
        source,
      }: {
        sourceType: string;
        source: string | object;
      });
    }

    /** @deprecated use ethersByChain instead */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function web3ByChain(chainId: string): any;

    function ethersByChain(chainId: string): {
      /** A provider with the supplied chainId */
      provider: Web3Provider;
      /** ethers.js library */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ethers: any;
    };
  }
}

declare const {
  Moralis,
}: typeof import('moralis') & typeof MoralisMissingTypes;

declare type MoralisUser = ReturnType<typeof Moralis.User.current>;

declare namespace redis {
  export interface RedisOptions {
    host: string;
    port: number;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function createClient(options: RedisOptions): any;
}

declare module 'xhr2';
