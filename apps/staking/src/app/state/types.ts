/**
 * ApplicationState
 */

import { WalletConnectingState } from '@dehub/shared/moralis';

export interface ApplicationState {
  walletModalOpen: boolean;
  walletConnectingState: WalletConnectingState;
}

/**
 * StateCollections
 */

export interface State {
  application: ApplicationState;
}
