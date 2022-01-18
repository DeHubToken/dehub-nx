import { Moralis } from 'moralis';
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
  try {
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
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getCurChainId = async () => {
  const web3 = await Moralis.Web3.enable();
  return await web3.eth.getChainId();
};

export const getCurChainIdHex = async () => {
  const web3 = await Moralis.Web3.enable();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (web3.currentProvider as any).chainId;
};

export const switchNetwork = async (chainId: number): Promise<boolean> => {
  const web3 = await Moralis.Web3.enable();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (web3.currentProvider as any).request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: `0x${chainId.toString(16)}` }],
  });
  return true;
};

export const addNetwork = async (chainId: number): Promise<boolean> => {
  try {
    const networkInfo: NetworkInfo = Constants[chainId];
    const web3 = await Moralis.Web3.enable();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (web3.currentProvider as any).request({
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
  } catch (addError) {
    // TODO: handle "add" error by showing error alert
    console.error('addEthereumChain', addError);
  }
  return false;
};
