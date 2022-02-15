import { WalletConnectingState } from '@dehub/shared/model';
import { LotteryState as PauseState } from './pause';
import { LotteryState as SpecialLotteryState } from './special-raffle/types';
import { LotteryState as StandardLotteryState } from './standard-raffle/types';

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
