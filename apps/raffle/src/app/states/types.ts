import { WalletConnectingState } from '@dehub/shared/config';
import { LotteryState as PauseState } from './pause';
import { LotteryState as StandardLotteryState } from './standard-raffle/types';
import { LotteryState as SpecialLotteryState } from './special-raffle/types';

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
