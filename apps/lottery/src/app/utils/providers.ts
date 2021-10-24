import { ethers } from 'ethers';

import { Constants, NetworkInfo } from '@dehub/shared/config';

import { getRpcUrl } from '../config/constants';

const RPC_URL = getRpcUrl();

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);

export const switchNetwork = async (chainId: number): Promise<boolean> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ethereum = (window as any).ethereum;
  if (ethereum) {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
    return true;
  }
  return false;
};

export const addNetwork = async (chainId: number): Promise<boolean> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      const networkInfo: NetworkInfo = Constants[chainId];
      console.log('networkInfo', networkInfo);
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: networkInfo.CHAIN_ID_HEX,
            chainName: networkInfo.CHAIN_NAME,
            rpcUrls: [networkInfo.RPC_URL],
            nativeCurrency: networkInfo.NATIVE_CURRENCY,
            blockExplorerUrls: [networkInfo.BLOCK_EXPLORER_URLS],
          },
        ],
      });
      return true;
    }
  } catch (addError) {
    // TODO: handle "add" error by showing error alert
    console.error('addEthereumChain', addError);
  }
  return false;
};
