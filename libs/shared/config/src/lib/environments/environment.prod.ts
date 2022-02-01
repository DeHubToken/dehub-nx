import { defaultSharedEnv, SharedEnv } from './env';

export const defaultSharedProdEnv: SharedEnv = {
  ...defaultSharedEnv,
  env: 'prod',
  production: true,

  web3: {
    networks: {
      bsc: {
        ...defaultSharedEnv.web3.networks.bsc,
        chainId: 56,
        chainIdHex: '0x38',
        chainName: 'Binance Smart Chain Mainnet',
        rpcUrl:
          'https://speedy-nodes-nyc.moralis.io/6b2569937eb2e5cb5996d2dc/bsc/mainnet',
        blockExplorerUrl: 'https://bscscan.com',
      },
    },
    addresses: {
      contracts: {
        dehub: '0xFC206f429d55c71cb7294EfF40c6ADb20dC21508',
        dehubBnb: '0xE876eE0945CE80Ef821633f2C18950b33Fb85633',
        bnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        bnbBusd: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
        busd: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        multiCall: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
      },
    },
  },
};
