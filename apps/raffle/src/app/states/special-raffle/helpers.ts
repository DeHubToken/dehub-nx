import {
  ethersToBigNumber,
  ethersToSerializedBigNumber,
} from '@dehub/shared/utils';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import SpecialLotteryAbi from '../../config/abis/SpecialLottery.json';
import { TICKET_LIMIT_PER_REQUEST } from '../../config/constants';
import {
  LotteryStatus,
  LotteryTicket,
  LotteryTicketClaimData,
  LotteryTicketOwner,
} from '../../config/constants/types';
import { getSpecialLotteryAddress } from '../../utils/addressHelpers';
import { getSpecialLotteryContract } from '../../utils/contractHelpers';
import { Call, multicallv2 } from '../../utils/multicall';
import {
  DeGrandPrize,
  LotteryResponse,
  LotteryRound,
  LotteryRoundUserTickets,
} from './types';

const specialLotteryContract = getSpecialLotteryContract();

const processViewLotterySuccessResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any,
  lotteryId: string
): LotteryResponse => {
  const {
    deLottoStatus,
    deGrandStatus,
    startTime,
    endTime,
    ticketRate,
    unwonPreviousPot,
    amountCollectedToken,
    firstTicketId,
    firstTicketIdNextLottery,
  } = response;

  const deLottoStatusKey = Object.keys(LotteryStatus)[deLottoStatus];
  const deGrandStatusKey = Object.keys(LotteryStatus)[deGrandStatus];

  return {
    isLoading: false,
    lotteryId,
    deLottoStatus:
      LotteryStatus[deLottoStatusKey as keyof typeof LotteryStatus],
    deGrandStatus:
      LotteryStatus[deGrandStatusKey as keyof typeof LotteryStatus],
    startTime: startTime?.toString(),
    endTime: endTime?.toString(),
    firstTicketId: firstTicketId?.toString(),
    lastTicketId: firstTicketIdNextLottery?.toString(),
    priceTicketInDehub: ethersToSerializedBigNumber(ticketRate),
    unwonPreviousPotInDehub: ethersToSerializedBigNumber(unwonPreviousPot),
    amountCollectedInDehub: ethersToSerializedBigNumber(amountCollectedToken),
  };
};

const processViewLotteryAndError = (lotteryId: string): LotteryResponse => {
  return {
    isLoading: true,
    lotteryId,
    deLottoStatus: LotteryStatus.PENDING,
    deGrandStatus: LotteryStatus.PENDING,
    startTime: '',
    endTime: '',
    firstTicketId: '',
    lastTicketId: '',
    priceTicketInDehub: '',
    unwonPreviousPotInDehub: '',
    amountCollectedInDehub: '',
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processRawTicketsReponse = (data: any): LotteryTicket[] => {
  const [ticketIds, claimStatuses] = data;

  if (ticketIds.length > 0) {
    return ticketIds.map((ticketId: EthersBigNumber, index: number) => {
      return {
        id: ticketId.toString(),
        number: '',
        claimed: claimStatuses[index],
      };
    });
  }
  return [];
};

export const fetchLottery = async (
  lotteryId: string
): Promise<LotteryResponse> => {
  try {
    const lotteryData = await specialLotteryContract.viewLottery(lotteryId);
    return processViewLotterySuccessResponse(lotteryData, lotteryId);
  } catch (error) {
    return processViewLotteryAndError(lotteryId);
  }
};

export const fetchCurrentLotteryIdAndMaxBuy = async () => {
  try {
    const calls: Call[] = [
      'currentLotteryId',
      'maxNumberTicketsPerBuyOrClaim',
    ].map(method => ({
      address: getSpecialLotteryAddress(),
      name: method,
    }));

    const [[currentLotteryId], [maxNumberTicketsPerBuyOrClaim]] =
      (await multicallv2(SpecialLotteryAbi, calls)) as EthersBigNumber[][];

    return {
      currentLotteryId: currentLotteryId ? currentLotteryId.toString() : '',
      maxNumberTicketsPerBuyOrClaim: maxNumberTicketsPerBuyOrClaim
        ? maxNumberTicketsPerBuyOrClaim.toString()
        : '',
    };
  } catch (error) {
    return {
      currentLotteryId: '',
      maxNumberTicketsPerBuyOrClaim: '',
    };
  }
};

export const viewUserInfoForLotteryId = async (
  account: string,
  lotteryId: string,
  cursor: number,
  perRequestLimit: number
): Promise<LotteryTicket[] | null> => {
  try {
    const data = await specialLotteryContract.viewUserInfoForLotteryId(
      account,
      lotteryId,
      cursor,
      perRequestLimit
    );
    return processRawTicketsReponse(data);
  } catch (error) {
    console.error('viewUserInfoForLotteryId', error);
    return null;
  }
};

export const fetchUserTicketsPerOneRound = async (
  account: string,
  lotteryId: string
): Promise<LotteryTicket[]> => {
  let cursor = 0;
  let numReturned = TICKET_LIMIT_PER_REQUEST;
  const ticketData: LotteryTicket[] = [];

  while (numReturned === TICKET_LIMIT_PER_REQUEST) {
    const response = await viewUserInfoForLotteryId(
      account,
      lotteryId,
      cursor,
      numReturned
    );
    if (response) {
      cursor += response?.length;
      ticketData.push(...response);
    }
    numReturned = response?.length ?? 0;
  }

  return ticketData;
};

export const fetchUserTicketsPerMultipleRounds = async (
  account: string,
  lotteryIds: string[]
): Promise<{ roundId: string; userTickets: LotteryTicket[] }[]> => {
  const ticketsForMultipleRounds = [];
  for (let idx = 0; idx < lotteryIds.length; idx++) {
    const roundId = lotteryIds[idx];
    const ticketsForRound = await fetchUserTicketsPerOneRound(account, roundId);
    ticketsForMultipleRounds.push({
      roundId,
      userTickets: ticketsForRound,
    });
  }
  return ticketsForMultipleRounds;
};

export const viewDeLottoWinningForTicketIds = async (
  lotteryId: string,
  ticketIds: string[]
): Promise<boolean[] | null> => {
  try {
    const data = await specialLotteryContract.viewDeLottoWinningForTicketIds(
      lotteryId,
      ticketIds
    );
    return data;
  } catch (error) {
    console.error('viewDeLottoWinningForTicketIds', error);
    return null;
  }
};

export const fetchDeLottoWinningForTicketIds = async (
  lotteryId: string,
  ticketIds: string[]
): Promise<boolean[]> => {
  let cursor = 0;
  const numReturned = 100; // TICKET_LIMIT_PER_REQUEST; // @todo
  const winningTicketIds: boolean[] = [];

  while (cursor < ticketIds.length) {
    const checkTicketIds: string[] = ticketIds.slice(
      cursor,
      cursor + numReturned
    );
    const response = await viewDeLottoWinningForTicketIds(
      lotteryId,
      checkTicketIds
    );
    if (response) {
      cursor += response?.length;
      winningTicketIds.push(...response);
    } else {
      break;
    }
  }

  return winningTicketIds;
};

export const fetchDeLottoRewardsForTicketIds = async (
  lotteryId: string,
  ticketIds: string[]
): Promise<BigNumber> => {
  let cursor = 0;
  const numReturned = 100; // TICKET_LIMIT_PER_REQUEST; // @todo
  let rewards: EthersBigNumber = EthersBigNumber.from('0');

  while (cursor < ticketIds.length) {
    const checkTicketIds: string[] = ticketIds.slice(
      cursor,
      cursor + numReturned
    );
    const response =
      await specialLotteryContract.viewDeLottoRewardsForTicketIds(
        lotteryId,
        checkTicketIds
      );
    if (response) {
      cursor += 100;
      rewards = rewards.add(response);
    } else {
      break;
    }
  }

  return ethersToBigNumber(rewards);
};

export const fetchUserDeLottoWinningRewards = async (
  account: string,
  lotteryId: string
): Promise<LotteryTicketClaimData | null> => {
  try {
    const ticketsForRound = await fetchUserTicketsPerOneRound(
      account,
      lotteryId
    );
    const ticketIds = ticketsForRound.map((ticket: LotteryTicket) => ticket.id);

    const ticketsWinning = await fetchDeLottoWinningForTicketIds(
      lotteryId,
      ticketIds
    );
    const rewardTotal = await fetchDeLottoRewardsForTicketIds(
      lotteryId,
      ticketIds
    );

    const ticketsWithUnclaimedRewards: LotteryTicket[] = [];
    const allWinningTickets: LotteryTicket[] = [];

    ticketsWinning.forEach((winning: boolean, index: number) => {
      if (winning) {
        if (!ticketsForRound[index].claimed) {
          ticketsWithUnclaimedRewards.push({
            id: ticketIds[index],
            number: '',
            claimed: ticketsForRound[index].claimed,
          });
        }
        allWinningTickets.push({
          id: ticketIds[index],
          number: '',
          claimed: ticketsForRound[index].claimed,
        });
      }
    });

    return {
      ticketsWithUnclaimedRewards,
      allWinningTickets,
      dehubTotal: rewardTotal,
      roundId: lotteryId,
      status: LotteryStatus.CLAIMABLE,
    };
  } catch (error) {
    console.error('fetchUserDeLottoWinningRewards', error);
  }

  return null;
};

export const fetchDeGrandPrize = async (
  timestamp: number
): Promise<DeGrandPrize | null> => {
  try {
    const {
      drawTime,
      title,
      subtitle,
      description,
      ctaUrl,
      imageUrl,
      maxWinnerCount,
    } = await specialLotteryContract.viewDeGrandPrize(timestamp);

    return {
      drawTime: parseInt(drawTime, 10),
      title,
      subtitle,
      description,
      ctaUrl,
      imageUrl,
      maxWinnerCount: parseInt(maxWinnerCount, 10),
    };
  } catch (error) {
    // console.error('fetchDeGrandPrize', error);
    return null;
  }
};

export const fetchUserDeGrandWinners = async (
  lotteryId: string
): Promise<LotteryTicketOwner[]> => {
  try {
    const [ticketOwners, ticketIds] =
      await specialLotteryContract.viewDeGrandStatusForTicketIds(lotteryId);
    if (ticketOwners.length > 0) {
      return ticketOwners.map((ticketOwner: string, index: number) => {
        return {
          owner: ticketOwner,
          ticketId: ethersToSerializedBigNumber(ticketIds[index]),
        };
      });
    }
    return [];
  } catch (error) {
    console.error('fetchUserDeGrandWinners', error);
    return [];
  }
};

export const fetchUserDeGrandWinnersPerMultipleRounds = async (
  lotteryIds: string[]
): Promise<{ roundId: string; winners: LotteryTicketOwner[] }[]> => {
  const winnersForMultipleRounds = [];
  for (let idx = 0; idx < lotteryIds.length; idx++) {
    const winnersForRound = await fetchUserDeGrandWinners(lotteryIds[idx]);
    winnersForMultipleRounds.push({
      roundId: lotteryIds[idx],
      winners: winnersForRound,
    });
  }
  return winnersForMultipleRounds;
};

export const useProcessLotteryResponse = (
  lotteryData: LotteryResponse & { userTickets?: LotteryRoundUserTickets }
): LotteryRound => {
  const {
    priceTicketInDehub: priceTicketInDehubAsString,
    unwonPreviousPotInDehub: unwonPreviousPotAsString,
    amountCollectedInDehub: amountCollectedInDehubAsString,
  } = lotteryData;

  const priceTicketInDehub = useMemo(() => {
    return new BigNumber(priceTicketInDehubAsString);
  }, [priceTicketInDehubAsString]);
  const unwonPreviousPotInDehub = useMemo(() => {
    return new BigNumber(unwonPreviousPotAsString);
  }, [unwonPreviousPotAsString]);
  const amountCollectedInDehub = useMemo(() => {
    return new BigNumber(amountCollectedInDehubAsString);
  }, [amountCollectedInDehubAsString]);

  return {
    isLoading: lotteryData.isLoading,
    lotteryId: lotteryData.lotteryId,
    userTickets: lotteryData.userTickets,
    deLottoStatus: lotteryData.deLottoStatus,
    deGrandStatus: lotteryData.deGrandStatus,
    startTime: lotteryData.startTime,
    endTime: lotteryData.endTime,
    firstTicketId: lotteryData.firstTicketId,
    lastTicketId: lotteryData.lastTicketId,
    priceTicketInDehub,
    unwonPreviousPotInDehub,
    amountCollectedInDehub,
  };
};

export const processLotteryResponse = (
  lotteryData: LotteryResponse & { userTickets?: LotteryRoundUserTickets }
): LotteryRound => {
  const {
    priceTicketInDehub: priceTicketInDehubAsString,
    unwonPreviousPotInDehub: unwonPreviousPotInDehubAsString,
    amountCollectedInDehub: amountCollectedInDehubAsString,
  } = lotteryData;

  const priceTicketInDehub = new BigNumber(priceTicketInDehubAsString);
  const unwonPreviousPotInDehub = new BigNumber(
    unwonPreviousPotInDehubAsString
  );
  const amountCollectedInDehub = new BigNumber(amountCollectedInDehubAsString);

  return {
    isLoading: lotteryData.isLoading,
    lotteryId: lotteryData.lotteryId,
    userTickets: lotteryData.userTickets,
    deLottoStatus: lotteryData.deLottoStatus,
    deGrandStatus: lotteryData.deGrandStatus,
    startTime: lotteryData.startTime,
    endTime: lotteryData.endTime,
    firstTicketId: lotteryData.firstTicketId,
    lastTicketId: lotteryData.lastTicketId,
    priceTicketInDehub,
    unwonPreviousPotInDehub,
    amountCollectedInDehub,
  };
};
