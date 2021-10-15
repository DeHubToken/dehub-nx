import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import { SerializedBigNumber } from '@dehub/shared/config';
import {
  LotteryStatus,
  LotteryTicket
} from '../../config/constants/types';

/**
 * StandardLotteryState
 */

export interface LotteryRoundUserTickets {
  isLoading?: boolean;
  tickets?: LotteryTicket[]
}

interface LotteryRoundGenerics {
  isLoading?: boolean;
  lotteryId: string;
  status: LotteryStatus;
  startTime: string;
  endTime: string;
  firstTicketId: string;
  lastTicketId: string;
  finalNumber: number;
}

export interface LotteryRound extends LotteryRoundGenerics {
  userTickets?: LotteryRoundUserTickets;
  priceTicketInDehub: BigNumber;
  amountCollectedInDehub: BigNumber;
  dehubPerBracket: string[];
  countWinnersPerBracket: string[];
  rewardsBreakdown: string[];
}

export interface LotteryResponse extends LotteryRoundGenerics {
  priceTicketInDehub: SerializedBigNumber;
  amountCollectedInDehub: SerializedBigNumber;
  dehubPerBracket: SerializedBigNumber[];
  countWinnersPerBracket: SerializedBigNumber[];
  rewardsBreakdown: SerializedBigNumber[];
}

export interface LotteryBundleRule {
  purchasedCount: number;
  freeCount: number;
}

export interface LotteryState {
  currentLotteryId: string;
  maxNumberTicketsPerBuyOrClaim: string;
  bundleRules: LotteryBundleRule[];
  isTransitioning: boolean;
  currentRound: LotteryResponse & { userTickets?: LotteryRoundUserTickets };
}

export interface UserRound {
  claimed: boolean;
  lotteryId: string;
  status: LotteryStatus;
  endTime: string;
  totalTickets: string;
  tickets?: LotteryTicket[]
}

export type UserTicketsResponnse = [ethers.BigNumber[], number[], boolean[]];