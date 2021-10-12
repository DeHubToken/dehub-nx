import BigNumber from 'bignumber.js';

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
}

export interface LotteryTicketClaimData {
  ticketsWithUnclaimedRewards: LotteryTicket[];
  allWinningTickets: LotteryTicket[];
  dehubTotal: BigNumber;
  roundId: string;
}