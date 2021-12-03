import { BNB_DECIMALS, DEHUB_DECIMALS } from '@dehub/shared/config';
import { getBalanceNumber, ethersToBigNumber } from '@dehub/shared/utils';

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

const EIGHT_DIGITS = 8;

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
    const pureRounds = await multicall(PredictionsAbi, calls);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const roundsResponse = pureRounds.map((round: any) => {
      return {
        id: round[0].toNumber(),
        epoch: round[0].toNumber(),
        failed: false,
        startBlock: round[1].toNumber(),
        startAt: 0,
        lockAt: 0,
        lockBlock: round[2].toNumber(),
        lockPrice: getBalanceNumber(ethersToBigNumber(round[4]), EIGHT_DIGITS),
        endBlock: round[3].toNumber(),
        closePrice: getBalanceNumber(ethersToBigNumber(round[5]), EIGHT_DIGITS),
        totalBets: 0,
        totalAmount: getBalanceNumber(
          ethersToBigNumber(round[6]),
          EIGHT_DIGITS
        ),
        bullBets: 0,
        bearBets: 0,
        bearAmount: getBalanceNumber(ethersToBigNumber(round[8]), EIGHT_DIGITS),
        bullAmount: getBalanceNumber(ethersToBigNumber(round[7]), EIGHT_DIGITS),
        position: round[5].eq(round[4]) // close price === lock price
          ? 'House'
          : round[5].gt(round[4])
          ? 'Bull'
          : round[5].lt(round[4])
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
