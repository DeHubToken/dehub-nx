import BigNumber from 'bignumber.js';
import { LotteryStatus, LotteryTicket } from '../../config/constants/types';

/**
 * StandardLotteryState
 */

export interface LotteryRoundUserTickets {
  isLoading?: boolean;
  tickets?: LotteryTicket[];
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
  unwonPreviousPotInDehub: BigNumber;
  amountCollectedInDehub: BigNumber;
  dehubPerBracket: string[];
  countWinnersPerBracket: string[];
  rewardsBreakdown: string[];
}

export interface LotteryResponse extends LotteryRoundGenerics {
  priceTicketInDehub: string;
  unwonPreviousPotInDehub: string;
  amountCollectedInDehub: string;
  dehubPerBracket: string[];
  countWinnersPerBracket: string[];
  rewardsBreakdown: string[];
}

export interface LotteryBundleRule {
  purchasedCount: number;
  freeCount: number;
}

export interface LotteryUserData {
  account: string;
  dehubTotal: string; // total unclaimed amount
  rounds: LotteryUserRound[]; // array of user information per round
}

export interface LotteryUserRound {
  // Similar with LotteryTicketClaimData
  status: LotteryStatus;
  roundId: string;
  dehubTotal: string; // unclaimed amount in a round
  ticketsWithUnclaimedRewards: LotteryTicket[];
  allWinningTickets: LotteryTicket[];
}

export interface LotteryState {
  currentLotteryId: string;
  maxNumberTicketsPerBuyOrClaim: string;
  bundleRules: LotteryBundleRule[];
  isTransitioning: boolean;
  currentRound: LotteryResponse & { userTickets?: LotteryRoundUserTickets };
  userLotteryData: LotteryUserData & { isLoading: boolean };
}
