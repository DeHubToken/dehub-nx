import BigNumber from 'bignumber.js';

export enum LotteryPrizeLevel {
  NONE = 0,
  BRONZE = 1,
  SILVER = 2,
  GOLD = 3
}

export enum LotteryStatus {
  PENDING = 'Pending',
  OPEN = 'Open',
  CLOSE = 'Close',
  CLAIMABLE = 'Claimable',
  BURNED = 'Burned'
}

export interface LotteryTicket {
  id: string;
  number: string;
  claimed?: boolean;
  rewardBracket?: number;
  roundId?: string;
  dehubReward?: string;
}

export interface LotteryTicketClaimData {
  ticketsWithUnclaimedRewards: LotteryTicket[];
  allWinningTickets: LotteryTicket[];
  dehubTotal: BigNumber;
  roundId: string;
}