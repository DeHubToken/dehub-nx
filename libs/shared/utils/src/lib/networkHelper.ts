import { Constants, NetworkInfo } from '@dehub/shared/config';

/**
 * Ask current chain id and switch network if different
 * @param chainId Destination ChainId
 */
export const setupNetwork = async (
  chainId: number,
  onSwitchNetwork?: (
    currentChainIdHex: string,
    newChainId: number,
    newChainIdHex: string
  ) => void,
  onAddNetwork?: (chainId: number, chainIdHex: string) => void
) => {
  const curChainIdHex = await getCurChainIdHex();

  const chainIdHex = `0x${chainId.toString(16)}`;

  // If wrong chain id, ask to switch network
  if (curChainIdHex !== chainIdHex) {
    console.warn('Ask to switch network');
    if (onSwitchNetwork) {
      onSwitchNetwork(curChainIdHex, chainId, chainIdHex);
    }

    try {
      return await switchNetwork(chainId);
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((switchError as any).code === 4902) {
        if (onAddNetwork) {
          onAddNetwork(chainId, chainIdHex);
        }
        return await addNetwork(chainId);
      }
      return false;
    }
  }
  return true;
};

export const getCurChainIdHex = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ethereum = (window as any).ethereum;
  // Get current chain id in hex
  return await ethereum?.request({ method: 'eth_chainId' });
};

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
