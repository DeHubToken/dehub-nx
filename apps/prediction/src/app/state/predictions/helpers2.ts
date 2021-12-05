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
const FIVE_DIGITS = 5;

export const numberOrNull = (value: string | null) => {
  if (value === null) {
    return null;
  }

  const valueNum = Number(value);
  return Number.isNaN(valueNum) ? null : valueNum;
};

const transformRoundResponse = (round: any): Round => {
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
    totalAmount: getBalanceNumber(ethersToBigNumber(round[6]), EIGHT_DIGITS),
    bullBets: 0,
    bearBets: 0,
    bearAmount: getBalanceNumber(ethersToBigNumber(round[8]), EIGHT_DIGITS),
    bullAmount: getBalanceNumber(ethersToBigNumber(round[7]), EIGHT_DIGITS),
    position: round[5].eq(round[4]) // close price === lock price
      ? BetPosition.HOUSE
      : round[5].gt(round[4])
      ? BetPosition.BULL
      : BetPosition.BEAR,
    bets: [], // Bet[], todo
  };
};

const fetchRounds = async (rounds: string[]): Promise<Round[]> => {
  const calls: Call[] = rounds.map(roundId => {
    return {
      name: 'rounds',
      address: getPredictionsAddress(),
      params: [roundId],
    };
  });

  const pureRounds = await multicall(PredictionsAbi, calls);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const roundsResponse = pureRounds.map((round: any) => {
    return transformRoundResponse(round);
  });

  return roundsResponse;
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

  try {
    const roundsResponse = await fetchRounds(roundsToCheck);

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

export const fetchBetHistory = async ({
  user,
  round_in,
}: {
  user: string;
  round_in: string[];
}): Promise<BetResponse[]> => {
  const calls: Call[] = round_in.map(roundId => {
    return {
      name: 'ledger',
      address: getPredictionsAddress(),
      params: [roundId, user],
    };
  });

  try {
    const pureBets = await multicall(PredictionsAbi, calls);

    const betsResponse = pureBets.map((bet: any, index: number) => {
      return {
        id: `${user}${round_in[index]}`,
        hash: '',
        amount: getBalanceNumber(ethersToBigNumber(bet[1]), EIGHT_DIGITS), // bet.amount
        position: BetPosition.BULL, // bet[0].toNumber() === 0 ? BetPosition.BULL : BetPosition.BEAR,
        claimed: bet[3] ? true : false,
      };
    });

    const roundsResponse = await fetchRounds(round_in);
    for (let idx = 0; idx < round_in.length; idx++) {
      betsResponse[idx].round = roundsResponse[idx];
    }

    return betsResponse;
  } catch (error) {
    console.error(error);

    return [];
  }
};
