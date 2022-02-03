import { Constants, NetworkInfo } from '@dehub/shared/config';
import { Moralis } from 'moralis';

/**
 * This method can only be used, when Metamask is used as a connector
 * Ask current chain id and switch network if different or add if missing
 *
 * @param requestedChainId the requested ChainId
 */
export const setupMetamaskNetwork = async (
  requestedChainId: number,
  onSwitchNetwork?: (
    currentChainIdHex: string,
    newChainId: number,
    newChainIdHex: string
  ) => void,
  onAddNetwork?: (chainId: number, chainIdHex: string) => void
) => {
  try {
    const currentChainIdHex = await Moralis.chainId;

    const requestedChainIdHex = `0x${requestedChainId.toString(16)}`;

    // If wrong chain id, ask to switch network
    if (currentChainIdHex && currentChainIdHex !== requestedChainIdHex) {
      console.warn('Please switch network!');
      if (onSwitchNetwork) {
        onSwitchNetwork(
          currentChainIdHex,
          requestedChainId,
          requestedChainIdHex
        );
      }

      await Moralis.switchNetwork(requestedChainIdHex)
        .then(() => true)
        .catch(async switchError => {
          // This error code indicates that the chain has not been added to MetaMask.
          if ((<{ code: number }>switchError).code === 4902) {
            if (onAddNetwork) {
              onAddNetwork(requestedChainId, requestedChainIdHex);
            }
            return await addNetwork(requestedChainId);
          }
          return false;
        });
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const addNetwork = async (
  requestedChainIdHex: number
): Promise<boolean> => {
  try {
    const networkInfo: NetworkInfo = Constants[requestedChainIdHex];

    const chainId = requestedChainIdHex;
    const chainName = networkInfo.CHAIN_NAME;
    const currencyName = networkInfo.NATIVE_CURRENCY.name;
    const currencySymbol = networkInfo.NATIVE_CURRENCY.symbol;
    const rpcUrl = networkInfo.RPC_URL;
    const blockExplorerUrl = networkInfo.BLOCK_EXPLORER_URLS;

    return await Moralis.addNetwork(
      chainId,
      chainName,
      currencyName,
      currencySymbol,
      rpcUrl,
      blockExplorerUrl
    ).then(() => true);
  } catch (addError) {
    // TODO: handle "add" error by showing error alert
    console.error('addEthereumChain', addError);
  }
  return false;
};
