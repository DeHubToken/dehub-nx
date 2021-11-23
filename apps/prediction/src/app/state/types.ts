import BigNumber from 'bignumber.js';
import { FarmConfig } from '../config/constants/types';

export type TranslatableText =
  | string
  | {
      key?: string;
      data?: {
        [key: string]: string | number;
      };
    };

export interface Farm extends FarmConfig {
  tokenAmountMc?: BigNumber;
  quoteTokenAmountMc?: BigNumber;
  tokenAmountTotal?: BigNumber;
  quoteTokenAmountTotal?: BigNumber;
  lpTotalInQuoteToken?: BigNumber;
  lpTotalSupply?: BigNumber;
  tokenPriceVsQuote?: BigNumber;
  poolWeight?: BigNumber;
  userData?: {
    allowance: string;
    tokenBalance: string;
    stakedBalance: string;
    earnings: string;
  };
}

// Slices states

export interface FarmsState {
  data: Farm[];
  loadArchivedFarmsData: boolean;
  userDataLoaded: boolean;
}
// Block

export interface BlockState {
  currentBlock: number;
  initialBlock: number;
}

// Predictions

export enum BetPosition {
  BULL = 'Bull',
  BEAR = 'Bear',
  HOUSE = 'House',
}

export enum PredictionStatus {
  INITIAL = 'initial',
  LIVE = 'live',
  PAUSED = 'paused',
  ERROR = 'error',
}

export interface Round {
  id: string;
  epoch: number;
  failed?: boolean;
  startBlock: number;
  startAt: number;
  lockAt: number;
  lockBlock: number;
  lockPrice: number;
  endBlock: number;
  closePrice: number;
  totalBets: number;
  totalAmount: number;
  bullBets: number;
  bearBets: number;
  bearAmount: number;
  bullAmount: number;
  position: BetPosition;
  bets?: Bet[];
}

export interface Market {
  id: string;
  paused: boolean;
  epoch: number;
}

export interface Bet {
  id?: string;
  hash?: string;
  amount: number;
  position: BetPosition;
  claimed: boolean;
  user?: PredictionUser;
  round: Round;
}

export interface PredictionUser {
  id: string;
  address: string;
  block: number;
  totalBets: number;
  totalETH: number;
}

export interface RoundData {
  [key: string]: Round;
}

export interface HistoryData {
  [key: string]: Bet[];
}

export interface BetData {
  [key: string]: {
    [key: string]: Bet;
  };
}

export enum HistoryFilter {
  ALL = 'all',
  COLLECTED = 'collected',
  UNCOLLECTED = 'uncollected',
}

export interface PredictionsState {
  status: PredictionStatus;
  isLoading: boolean;
  isHistoryPaneOpen: boolean;
  isChartPaneOpen: boolean;
  isFetchingHistory: boolean;
  historyFilter: HistoryFilter;
  currentEpoch: number;
  currentRoundStartBlockNumber: number;
  intervalBlocks: number;
  bufferBlocks: number;
  minBetAmount: string;
  lastOraclePrice: string;
  rounds: RoundData;
  history: HistoryData;
  bets: BetData;
}

// Global state

export interface State {
  block: BlockState;
  farms: FarmsState;
  predictions: PredictionsState;
}
