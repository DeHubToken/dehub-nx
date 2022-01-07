import { WalletConnectingState } from '@dehub/shared/config';
import { LotteryState as PauseState } from './pause';

/**
 * ApplicationState
 */

export interface ApplicationState {
  walletModalOpen: boolean;
  walletConnectingState: WalletConnectingState;
}

/**
 * StateCollections
 */

export interface State {
  application: ApplicationState;
  paused: PauseState;
}
