import BigNumber from 'bignumber.js';
import {
  LotteryStatus,
  LotteryTicket,
  LotteryTicketOwner,
} from '../../config/constants/types';

/**
 * SpecialLotteryState
 */
export interface LotteryRoundUserTickets {
  isLoading?: boolean;
  tickets?: LotteryTicket[];
}

interface LotteryRoundGenerics {
  isLoading?: boolean;
  lotteryId: string;
  deLottoStatus: LotteryStatus;
  deGrandStatus: LotteryStatus;
  startTime: string;
  endTime: string;
  firstTicketId: string;
  lastTicketId: string;
}

export interface LotteryRound extends LotteryRoundGenerics {
  userTickets?: LotteryRoundUserTickets;
  priceTicketInDehub: BigNumber;
  unwonPreviousPotInDehub: BigNumber;
  amountCollectedInDehub: BigNumber;
}

export interface LotteryResponse extends LotteryRoundGenerics {
  priceTicketInDehub: string;
  unwonPreviousPotInDehub: string;
  amountCollectedInDehub: string;
}

export interface DeGrandPrize {
  drawTime: number;
  title: string;
  subtitle: string;
  description?: string;
  ctaUrl?: string;
  imageUrl?: string;
  maxWinnerCount: number;
}

export interface DeGrandHistory {
  roundId: string;
  winners: LotteryTicketOwner[];
  myWinningTickets?: string[];
  winningAddresses?: string[];
  prize: DeGrandPrize;
}

export interface LotteryState {
  currentLotteryId: string;
  maxNumberTicketsPerBuyOrClaim: string;
  isTransitioning: boolean;
  currentRound: LotteryResponse & { userTickets?: LotteryRoundUserTickets };
  deGrandPrize: DeGrandPrize;
}
