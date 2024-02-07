import { networks } from '@dehub/shared/model';
import { random } from 'lodash';
import { Moralis } from 'moralis-v1';
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
  onAddNetwork?: (currentChainId: number, requestedChainId: number) => void,
  afterSwitchNetwork?: (success: boolean) => void,
  afterAddNetwork?: (success: boolean) => void
): Promise<boolean> => {
  const currentChainIdHex = Moralis.chainId;
  const requestedChainIdHex = decimalToHex(requestedChainId);
  // console.log(
  //   'HHH - setupMetamaskNetwork',
  //   currentChainIdHex,
  //   requestedChainIdHex
  // );
  // Switch Network
  if (currentChainIdHex && currentChainIdHex !== requestedChainIdHex) {
    const currentChainId = hexToDecimal(currentChainIdHex);
    console.warn('Please switch network!');

    if (onSwitchNetwork) onSwitchNetwork(currentChainId, requestedChainId);
    const switchResult = await Moralis.switchNetwork(requestedChainIdHex)
      .then(() => true)
      .catch(async switchError => {
        // The chain has not been added to MetaMask
        if ((<{ code: number }>switchError).code === 4902) {
          if (onAddNetwork) onAddNetwork(currentChainId, requestedChainId);

          const addResult = await addNetwork(requestedChainId);
          if (afterAddNetwork) afterAddNetwork(addResult);
          return addResult;
        }
        return false;
      });
    if (afterSwitchNetwork) afterSwitchNetwork(switchResult);
    return switchResult;
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
    nativeCurrency: { name: currencyName, symbol: currencySymbol },
  } = networks[requestedChainId];

  const rpcUrl = getRandomRpcUrlByChainId(requestedChainId);

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
 * Pick random RPC url from nodes by Chain Id .
 *
 * @param chainId the decimal chain id
 * @returns random node url as rpc
 */
export const getRandomRpcUrlByChainId = (chainId: number) => {
  const rpcNodesByChainId = networks[chainId].nodes;
  return rpcNodesByChainId[random(0, rpcNodesByChainId.length - 1)];
};
