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
    }

    /** @deprecated use ethersByChain instead */
    function web3ByChain(chainId: string): any;

    function ethersByChain(chainId: string): {
      /** A provider with the supplied chainId */
      provider: Web3Provider;
      /** ethers.js library */
      ethers: any;
    };
  }
}

declare const {
  Moralis,
}: typeof import('moralis') & typeof MoralisMissingTypes;
