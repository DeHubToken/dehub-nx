import { ethersToSerializedBigNumber } from '@dehub/shared/utils';

import { DeGrandHistory } from './types';

import SpecialLotteryAbi from '../../config/abis/SpecialLottery.json';
import { LotteryTicketOwner } from '../../config/constants/types';
import { getSpecialLotteryAddress } from '../../utils/addressHelpers';
import { Call, multicallv2 } from '../../utils/multicall';

export const fetchHistoricalDeGrands = async (
  lotteryId: string, requestSize: number
): Promise<DeGrandHistory[]> => {

  try {
    const roundId: number = parseInt(lotteryId, 10);
    const roundsToCheck = [];
    for (let idx = 0; roundId - idx > 0 && idx < requestSize; idx++) {
      roundsToCheck.push((roundId - idx).toString());
    }

    const calls: Call[] = roundsToCheck.map((roundId: string) => ({
      address: getSpecialLotteryAddress(),
      name: "viewDeGrandStatusForTicketIds",
      params: [roundId]
    }));

    const winnersResponse = await multicallv2(SpecialLotteryAbi, calls);

    const calls2: Call[] = roundsToCheck.map((roundId: string) => ({
      address: getSpecialLotteryAddress(),
      name: "viewDeGrandPrizeByLotteryId",
      params: [roundId]
    }));

    const prizesResponse = await multicallv2(SpecialLotteryAbi, calls2);

    const history: DeGrandHistory[] = [];
    roundsToCheck.forEach((roundId: string, index: number) => {
      const [ticketOwners, ticketIds] = winnersResponse[index];
      const winners: LotteryTicketOwner[] = ticketOwners.map((ticketOwner: string, index: number) => {
        return {
          owner: ticketOwner,
          ticketId: ethersToSerializedBigNumber(ticketIds[index])
        };
      });

      history.push({
        roundId,
        winners,
        prize: prizesResponse[index]
      });
    });
    return history;

  } catch (error) {
    console.error('fetchHistoricalDeGrands', error);
    return [];
  }
}