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
  // provider: Web3ProviderType = 'metamask'
) => {
  try {
    // if (provider !== 'metamask') return true;

    const currentChainIdHex =
      /* await getCurChainIdHex() */ await Moralis.chainId;

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

      try {
        // return await switchNetwork(chainId);
        await Moralis.switchNetwork(requestedChainIdHex).then(() => true);
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if ((<{ code: number }>switchError).code === 4902) {
          if (onAddNetwork) {
            onAddNetwork(requestedChainId, requestedChainIdHex);
          }
          return await addNetwork(requestedChainId);
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
  // const web3 = await Moralis.Web3.enable();
  // return await web3.eth.getChainId();
  const chainId = await Moralis.chainId;
  console.log('chainId', chainId);
  return chainId;
};

export const getCurChainIdHex = async () => {
  const chainId = await getCurChainId();
  const chainIdHex = chainId !== null ? `0x${(+chainId).toString(16)}` : null;
  console.log('chainIdHex', chainIdHex);
  return chainIdHex;
  // const web3 = await Moralis.Web3.enable();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // return (web3.currentProvider as any).chainId;
};

// export const switchNetwork = async (chainId: number): Promise<boolean> => {
//   const web3 = await Moralis.Web3.enable();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   await (web3.currentProvider as any).request({
//     // await (web3.currentProvider as any).request({
//     method: 'wallet_switchEthereumChain',
//     params: [{ chainId: `0x${chainId.toString(16)}` }],
//   });
//   return true;
// };

export const switchNetwork = async (chainId: number) => {
  // const web3 = await Moralis.enableWeb3();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // await (web3.currentProvider as any).request({
  //   // await (web3.currentProvider as any).request({
  //   method: 'wallet_switchEthereumChain',
  //   params: [{ chainId: `0x${chainId.toString(16)}` }],
  // });
  // return true;
  await Moralis.switchNetwork(`0x${chainId.toString(16)}`);
  return true;
};

export const addNetwork = async (
  requestedChainIdHex: number
): Promise<boolean> => {
  try {
    const networkInfo: NetworkInfo = Constants[requestedChainIdHex];
    // const web3 = await Moralis.Web3.enable();
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // return (web3.currentProvider as any).request({
    //   method: 'wallet_addEthereumChain',
    //   params: [
    //     {
    //       chainId: networkInfo.CHAIN_ID_HEX,
    //       chainName: networkInfo.CHAIN_NAME,
    //       rpcUrls: [networkInfo.RPC_URL],
    //       nativeCurrency: networkInfo.NATIVE_CURRENCY,
    //       blockExplorerUrls: [networkInfo.BLOCK_EXPLORER_URLS],
    //     },
    //   ],
    // });

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
