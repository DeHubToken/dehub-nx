import { ethersToSerializedBigNumber } from '@dehub/shared/utils';

import { DeGrandHistory } from './types';

import SpecialLotteryAbi from '../../config/abis/SpecialLottery.json';
import {
  LotteryStatus,
  LotteryTicketOwner,
} from '../../config/constants/types';
import { getSpecialLotteryAddress } from '../../utils/addressHelpers';
import { Call, multicallv2 } from '../../utils/multicall';

interface LotteryDrawable {
  roundId: string;
  deLottoStatus: LotteryStatus;
  deGrandStatus: LotteryStatus;
}

const fetchLotteryDrawable = async (
  roundIds: string[]
): Promise<LotteryDrawable[]> => {
  const calls: Call[] = roundIds.map(roundId => {
    return {
      name: 'viewLotteryDrawable',
      address: getSpecialLotteryAddress(),
      params: [roundId],
    };
  });

  try {
    const response = await multicallv2(SpecialLotteryAbi, calls);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const drawables = response.map((drawable: any, index: number) => {
      const deLottoStatusKey = Object.keys(LotteryStatus)[drawable[0]];
      const deGrandStatusKey = Object.keys(LotteryStatus)[drawable[1]];

      return {
        roundId: roundIds[index],
        deLottoStatus:
          LotteryStatus[deLottoStatusKey as keyof typeof LotteryStatus],
        deGrandStatus:
          LotteryStatus[deGrandStatusKey as keyof typeof LotteryStatus],
      };
    });

    return drawables;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchHistoricalDeGrands = async (
  lotteryId: string,
  requestSize: number
): Promise<DeGrandHistory[]> => {
  try {
    const roundId: number = parseInt(lotteryId, 10);
    const roundsToCheck = [];
    for (let idx = 0; roundId - idx > 0 && idx < requestSize; idx++) {
      roundsToCheck.push((roundId - idx).toString());
    }

    const drawables = await fetchLotteryDrawable(roundsToCheck);
    const claimableRounds = drawables.filter(drawable => {
      return drawable.deGrandStatus === LotteryStatus.CLAIMABLE;
    });

    if (claimableRounds.length < 1) {
      return [];
    }

    const idsToCheck = claimableRounds.map(item => item.roundId);

    const calls: Call[] = idsToCheck.map((roundId: string) => ({
      address: getSpecialLotteryAddress(),
      name: 'viewDeGrandStatusForTicketIds',
      params: [roundId],
    }));

    const winnersResponse = await multicallv2(SpecialLotteryAbi, calls);

    const calls2: Call[] = idsToCheck.map((roundId: string) => ({
      address: getSpecialLotteryAddress(),
      name: 'viewDeGrandPrizeByLotteryId',
      params: [roundId],
    }));

    const prizesResponse = await multicallv2(SpecialLotteryAbi, calls2);

    const history: DeGrandHistory[] = [];
    idsToCheck.forEach((roundId: string, index: number) => {
      const [ticketOwners, ticketIds] = winnersResponse[index];
      const winners: LotteryTicketOwner[] = ticketOwners.map(
        (ticketOwner: string, index: number) => {
          return {
            owner: ticketOwner,
            ticketId: ethersToSerializedBigNumber(ticketIds[index]),
          };
        }
      );

      history.push({
        roundId,
        winners,
        prize: prizesResponse[index][0],
      });
    });
    return history;
  } catch (error) {
    console.error('fetchHistoricalDeGrands', error);
    return [];
  }
};
