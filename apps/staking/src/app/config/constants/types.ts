import BigNumber from 'bignumber.js';

export enum LoadingStatus {
  LOADING = 0,
  SYNCHRONIZING = 1,
  PAUSED = 2,
  COMPLETE = 3,
}

export enum LotteryPrizeLevel {
  NONE = 0,
  BRONZE = 1,
  SILVER = 2,
  GOLD = 3,
}

export enum LotteryStatus {
  PENDING = 'Pending',
  OPEN = 'Open',
  CLOSE = 'Close',
  CLAIMABLE = 'Claimable',
  BURNED = 'Burned',
}

export interface LotteryTicket {
  id: string;
  number: string;
  claimed?: boolean;
  rewardBracket?: number;
  roundId?: string;
  dehubReward?: string; // as type of SerializedBigNumber
}

export interface LotteryTicketClaimData {
  status: LotteryStatus;
  ticketsWithUnclaimedRewards: LotteryTicket[];
  allWinningTickets: LotteryTicket[];
  dehubTotal: BigNumber;
  roundId: string;
}

export interface LotteryTicketOwner {
  owner: string;
  ticketId: string;
}
