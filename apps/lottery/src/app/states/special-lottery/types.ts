import BigNumber from 'bignumber.js';
import { SerializedBigNumber } from '@dehub/shared/config';
import { LotteryStatus, LotteryTicket } from '../../config/constants/types';

/**
 * SpecialLotteryState
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
  deGrandMaximumWinners?: number;
}

export interface LotteryRound extends LotteryRoundGenerics {
  userTickets?: LotteryRoundUserTickets;
  priceTicketInDehub: BigNumber;
  amountCollectedInDehub: BigNumber;
}

export interface LotteryResponse extends LotteryRoundGenerics {
  priceTicketInDehub: SerializedBigNumber;
  amountCollectedInDehub: SerializedBigNumber;
}

export interface DeGrandPrize {
  lotteryId: string;
  title: string;
  subtitle: string;
  description?: string;
  ctaUrl?: string;
  imageUrl?: string;
  maxWinnerCount: number;
}

export interface LotteryState {
  currentLotteryId: string;
  maxNumberTicketsPerBuyOrClaim: string;
  isTransitioning: boolean;
  currentRound: LotteryResponse & { userTickets?: LotteryRoundUserTickets };
  deGrandPrize: DeGrandPrize;
}