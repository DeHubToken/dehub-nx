/**
 * ApplicationState
 */

import { WalletConnectingState } from '@dehub/shared/model';

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
