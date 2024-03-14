import { defaultSharedDevEnv, SharedEnv } from '@dehub/shared/model';

export interface Env extends SharedEnv {
  swap: {
    defaultInput: string;
    defaultOutput: string;
    factory: string;
    initCodeHash: string;
    router: string;
    slippage: number; // 100% in 10000
  };
}

export const defaultEnv: Env = {
  ...defaultSharedDevEnv,

  web3: {
    ...defaultSharedDevEnv.web3,
    chainId: 1,
    addresses: {
      contracts: {
        ...defaultSharedDevEnv.web3.addresses.contracts,
        dehubBnb: '0x25fb08d06ce3ef2ceaa971b786963fcfa397b537',
        dehubEth: '0x25FB08d06CE3eF2CEaA971B786963fcFa397b537',
        dehubPolygon: '0x25fb08d06ce3ef2ceaa971b786963fcfa397b537',
        wbnb: '0x418D75f65a02b3D53B2418FB8E1fe493759c7605',
        weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      }
    },
    auth: {
      ...defaultSharedDevEnv.web3.auth,
      walletConnectProjectId: '2fa20fc50239da14ddc410f769e4990d',
    },
  },
  
  swap: {
    defaultInput: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // $USDT
    defaultOutput: '0x99BB69Ee1BbFC7706C3ebb79b21C5B698fe58EC0', // $DHB
    factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    initCodeHash:
      '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    slippage: 1400,
  },
};
