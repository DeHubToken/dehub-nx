import { DEHUB_DECIMALS } from '@dehub/shared/config';
import { getBalanceNumber } from '@dehub/shared/utils';

import PredictionsAbi from '../../config/abi/predictions.json';
import { getPredictionsAddress } from '../../utils/addressHelpers';
import { getPredictionsContract } from '../../utils/contractHelpers';
import multicall, { Call } from '../../utils/multicall';
import {
  Bet,
  BetPosition,
  Market,
  PredictionStatus,
  Round,
  RoundData,
} from '../types';
import {
  BetResponse,
  getRoundBaseFields,
  getBetBaseFields,
  getUserBaseFields,
  RoundResponse,
  MarketResponse,
} from './queries';

export const numberOrNull = (value: string | null) => {
  if (value === null) {
    return null;
  }

  const valueNum = Number(value);
  return Number.isNaN(valueNum) ? null : valueNum;
};

export const fetchMarketData = async (
  roundCount = 5
): Promise<{
  rounds: Round[];
  market: Market;
}> => {
  const contract = getPredictionsContract();
  const currentEpoch = await contract.currentEpoch();
  const isPaused = await contract.paused();

  const roundsToCheck = [currentEpoch];
  for (let idx = 1; currentEpoch - idx > 0 && idx < roundCount; idx++) {
    roundsToCheck.push(currentEpoch - idx);
  }

  const calls: Call[] = roundsToCheck.map(roundId => {
    return {
      name: 'rounds',
      address: getPredictionsAddress(),
      params: [roundId],
    };
  });

  try {
    const rounds = await multicall(PredictionsAbi, calls);

    const roundsResponse = rounds.map((round: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return {
        id: round.epoch.toNumber(),
        epoch: round.epoch.toNumber(),
        failed: false,
        startBlock: round.startBlock.toNumber(),
        startAt: 0,
        lockAt: 0,
        lockBlock: round.lockBlock.toNumber(),
        lockPrice: getBalanceNumber(round.lockPrice, DEHUB_DECIMALS),
        endBlock: round.endBlock.toNumber(),
        closePrice: getBalanceNumber(round.closePrice, DEHUB_DECIMALS),
        totalBets: 0,
        totalAmount: getBalanceNumber(round.totalAmount, DEHUB_DECIMALS),
        bullBets: 0,
        bearBets: 0,
        bearAmount: getBalanceNumber(round.bearAmount, DEHUB_DECIMALS),
        bullAmount: getBalanceNumber(round.bullAmount, DEHUB_DECIMALS),
        position: round.closePrice.eq(round.lockPrice)
          ? 'House'
          : round.closePrice.gt(round.lockPrice)
          ? 'Bull'
          : round.closePrice.lt(round.lockPrice)
          ? 'Bear'
          : null,
        bets: [], // Bet[], todo
      };
    });

    return {
      rounds: roundsResponse,
      market: {
        id: '',
        paused: isPaused,
        epoch: currentEpoch,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      rounds: [],
      market: {
        id: '',
        paused: false,
        epoch: 0,
      },
    };
  }
};
