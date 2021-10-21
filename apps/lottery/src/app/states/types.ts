import { WalletConnectingState } from '@dehub/shared/config';
import { LotteryState as PauseState } from './pause';
import { LotteryState as StandardLotteryState } from './standard-lottery/types';
import { LotteryState as SpecialLotteryState } from './special-lottery/types';


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
  standardLottery: StandardLotteryState;
  specialLottery: SpecialLotteryState;
}