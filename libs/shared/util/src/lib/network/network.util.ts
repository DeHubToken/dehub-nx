import { Networks } from '@dehub/shared/config';
import { random } from 'lodash';
import { Moralis } from 'moralis';
import { decimalToHex } from './decimal-to-hex';
import { hexToDecimal } from './hex-to-decimal';

/**
 * Setup network for Metamask which involves adding or switching network as requested.
 *
 * @param requestedChainId the requested chain id
 */
export const setupMetamaskNetwork = async (
  requestedChainId: number,
  onSwitchNetwork?: (currentChainId: number, requestedChainId: number) => void,
  onAddNetwork?: (currentChainId: number, requestedChainId: number) => void
): Promise<boolean> => {
  const currentChainIdHex = Moralis.chainId;
  const requestedChainIdHex = decimalToHex(requestedChainId);

  // Switch Network
  if (currentChainIdHex && currentChainIdHex !== requestedChainIdHex) {
    const currentChainId = hexToDecimal(currentChainIdHex);
    console.warn('Please switch network!');

    if (onSwitchNetwork) onSwitchNetwork(currentChainId, requestedChainId);
    await Moralis.switchNetwork(requestedChainIdHex)
      .then(() => true)
      .catch(async switchError => {
        // The chain has not been added to MetaMask
        if ((<{ code: number }>switchError).code === 4902) {
          if (onAddNetwork) onAddNetwork(currentChainId, requestedChainId);

          return await addNetwork(requestedChainId);
        }
        return false;
      });
  }
  return true;
};

export const addNetwork = async (
  requestedChainId: number
): Promise<boolean> => {
  const {
    chainId,
    chainName,
    blockExplorerUrl,
    nodes,
    nativeCurrency: { name: currencyName, symbol: currencySymbol },
  } = Networks[requestedChainId];

  const rpcUrl = getRandomRpcUrl(nodes);

  return await Moralis.addNetwork(
    chainId,
    chainName,
    currencyName,
    currencySymbol,
    rpcUrl,
    blockExplorerUrl
  )
    .then(() => true)
    .catch(error => {
      console.error('Moralis addNetwork failed', error);
      return false;
    });
};

/**
 * Pick random RPC url from nodes.
 *
 * @param nodes the network nodes
 * @returns random node url as rpc
 */
export const getRandomRpcUrl = (nodes: string[]) =>
  nodes[random(0, nodes.length - 1)];
