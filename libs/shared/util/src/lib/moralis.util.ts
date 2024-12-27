import {
  WalletConnectingMessage,
  WalletConnectingState,
} from '@dehub/shared/model';

export const resolveMessage = (state: WalletConnectingState) => {
  let msg = '';
  switch (state) {
    case WalletConnectingState.SWITCH_NETWORK:
      msg = WalletConnectingMessage.SWITCH_NETWORK;
      break;
    case WalletConnectingState.ADD_NETWORK:
      msg = WalletConnectingMessage.ADD_NETWORK;
      break;
    case WalletConnectingState.ERROR:
      msg = WalletConnectingMessage.UnknownError;
      break;
    default:
      msg = WalletConnectingMessage.WAITING;
  }
  return msg;
};
/**
 * Return WalletConnectModal options.
 *
 * Docs: https://docs.walletconnect.com/2.0/web/walletConnectModal/modal/options
 * @param env the Dehub Environment
 * @returns preferred WalletConnectModal options
 */
export const getWalletConnectQrModalOptions = (legalPage: string) => ({
  themeMode: 'dark',
  explorerRecommendedWalletIds: [
    // Metamask
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    // Trust Wallet
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
    // SafePal
    '0b415a746fb9ee99cce155c2ceca0c6f6061b1dbca2d722b3ba16381d0562150',
  ],
  explorerExcludedWalletIds: 'ALL',
  termsOfServiceUrl: `${legalPage}/terms`,
  privacyPolicyUrl: `${legalPage}/privacy`,
});
