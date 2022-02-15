import {
  BIG_ZERO,
  ethersToBigNumber,
  getBalanceNumber,
} from '@dehub/shared/util';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import BigNumber from 'bignumber.js';
import PredictionsAbi from '../../config/abi/predictions.json';
import { getPredictionsAddress } from '../../utils/addressHelpers';
import { getPredictionsContract } from '../../utils/contractHelpers';
import multicall, { Call } from '../../utils/multicall';
import { BetPosition, Market, Round } from '../types';
import { BetResponse } from './queries';

const EIGHT_DIGITS = 8;
const FIVE_DIGITS = 5;

export const numberOrNull = (value: string | null) => {
  if (value === null) {
    return null;
  }

  const valueNum = Number(value);
  return Number.isNaN(valueNum) ? null : valueNum;
};

export const transformRoundResponse = (
  round: EthersBigNumber[],
  currentEpoch: BigNumber
): Round => {
  return {
    id: round[0].toString(),
    epoch: round[0].toNumber(),
    failed:
      round[0].toNumber() === currentEpoch.toNumber() - 1 ? false : !round[11], // oracle Called
    startBlock: round[1].toNumber(),
    startAt: 0,
    lockAt: 0,
    lockBlock: round[2].toNumber(),
    lockPrice: getBalanceNumber(ethersToBigNumber(round[4]), EIGHT_DIGITS),
    endBlock: round[3].toNumber(),
    closePrice: getBalanceNumber(ethersToBigNumber(round[5]), EIGHT_DIGITS),
    totalBets: 0,
    totalAmount: getBalanceNumber(ethersToBigNumber(round[6]), FIVE_DIGITS),
    bullBets: 0,
    bearBets: 0,
    bearAmount: getBalanceNumber(ethersToBigNumber(round[8]), FIVE_DIGITS),
    bullAmount: getBalanceNumber(ethersToBigNumber(round[7]), FIVE_DIGITS),
    position: round[5].eq(round[4]) // close price === lock price
      ? BetPosition.HOUSE
      : round[5].gt(round[4])
      ? BetPosition.BULL
      : BetPosition.BEAR,
    bets: [], // Bet[], todo
  };
};

const fetchRounds = async (
  rounds: string[],
  currentEpoch: BigNumber
): Promise<Round[]> => {
  const calls: Call[] = rounds.map(roundId => {
    return {
      name: 'rounds',
      address: getPredictionsAddress(),
      params: [roundId],
    };
  });

  const pureRounds = await multicall(PredictionsAbi, calls);

  const roundsResponse = pureRounds.map((round: EthersBigNumber[]) => {
    return transformRoundResponse(round, currentEpoch);
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
    const roundsResponse = await fetchRounds(
      roundsToCheck,
      currentEpoch as BigNumber
    );

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
  if (!user) return [];

  const calls: Call[] = round_in.map(roundId => {
    return {
      name: 'ledger',
      address: getPredictionsAddress(),
      params: [roundId, user],
    };
  });

  try {
    const contract = getPredictionsContract();
    const currentEpoch = await contract.currentEpoch();
    const pureBets = await multicall(PredictionsAbi, calls);

    // eslint-disable-next-line prefer-const
    let betsResponse = pureBets.map((bet: EthersBigNumber[], index: number) => {
      const amount = ethersToBigNumber(bet[1]);
      if (amount.eq(BIG_ZERO)) {
        return null;
      }
      return {
        id: `${user}_${round_in[index]}`,
        hash: '',
        amount: getBalanceNumber(amount, FIVE_DIGITS), // bet.amount
        position:
          ethersToBigNumber(bet[0]).toNumber() === 0
            ? BetPosition.BULL
            : BetPosition.BEAR,
        claimed: bet[3] ? true : false,
      };
    });

    const roundsResponse = await fetchRounds(
      round_in,
      currentEpoch as BigNumber
    );
    for (let idx = 0; idx < round_in.length; idx++) {
      if (betsResponse[idx] === null) continue;
      betsResponse[idx].round = roundsResponse[idx];
    }

    return betsResponse.filter((bet: EthersBigNumber[]) => bet !== null);
  } catch (error) {
    console.error(error);

    return [];
  }
};
