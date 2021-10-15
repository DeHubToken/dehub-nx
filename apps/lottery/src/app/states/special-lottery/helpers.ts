import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { ethersToSerializedBigNumber } from '@dehub/shared/utils';
import { LotteryRound, LotteryResponse, LotteryRoundUserTickets } from './types';

import SpecialLotteryAbi from '../../config/abis/SpecialLottery.json';
import { LotteryStatus, LotteryTicket } from '../../config/constants/types';
import { TICKET_LIMIT_PER_REQUEST } from '../../config/constants';
import { getSpecialLotteryAddress } from '../../utils/addressHelpers';
import { getSpecialLotteryContract } from '../../utils/contractHelpers';
import { Call, multicallv2 } from '../../utils/multicall';

const specialLotteryContract = getSpecialLotteryContract();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processViewLotterySuccessResponse = (response: any, lotteryId: string): LotteryResponse => {
  const {
    status,
    startTime,
    endTime,
    ticketRate,
    amountCollectedToken,
    firstTicketId,
    firstTicketIdNextLottery,
    deGrandMaximumWinners,
  } = response;

  const statusKey = Object.keys(LotteryStatus)[status];

  return {
    isLoading: false,
    lotteryId,
    status: LotteryStatus[statusKey as keyof typeof LotteryStatus],
    startTime: startTime?.toString(),
    endTime: endTime?.toString(),
    firstTicketId: firstTicketId?.toString(),
    lastTicketId: firstTicketIdNextLottery?.toString(),
    priceTicketInDehub: ethersToSerializedBigNumber(ticketRate),
    amountCollectedInDehub: ethersToSerializedBigNumber(amountCollectedToken),
    deGrandMaximumWinners: parseInt(deGrandMaximumWinners, 10)
  };
}

const processViewLotteryAndError = (lotteryId: string): LotteryResponse => {
  return {
    isLoading: true,
    lotteryId,
    status: LotteryStatus.PENDING,
    startTime: '',
    endTime: '',
    firstTicketId: '',
    lastTicketId: '',
    priceTicketInDehub: '',
    amountCollectedInDehub: '',
    deGrandMaximumWinners: 0
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processRawTicketsReponse = (data: any): LotteryTicket[] => {
  const [ticketIds, claimStatuses,] = data;

  if (ticketIds.length > 0) {
    return ticketIds.map((ticketId: ethers.BigNumber, index: number) => {
      return {
        id: ticketId.toString(),
        number: '',
        claimed: claimStatuses[index]
      };
    })
  }
  return [];
}

export const fetchLottery = async (lotteryId: string): Promise<LotteryResponse> => {
  try {
    const lotteryData = await specialLotteryContract.viewLottery(lotteryId);
    return processViewLotterySuccessResponse(lotteryData, lotteryId);

  } catch (error) {
    return processViewLotteryAndError(lotteryId);
  }
}

export const fetchCurrentLotteryIdAndMaxBuy = async () => {
  try {
    const calls: Call[] = [
      'currentLotteryId', 'maxNumberTicketsPerBuyOrClaim'
    ].map((method) => ({
      address: getSpecialLotteryAddress(),
      name: method,
    }));

    const [[currentLotteryId], [maxNumberTicketsPerBuyOrClaim]] =
      (await multicallv2(
        SpecialLotteryAbi,
        calls
      )) as ethers.BigNumber[][];

    return {
      currentLotteryId:
        currentLotteryId ? currentLotteryId.toString() : '',
      maxNumberTicketsPerBuyOrClaim:
        maxNumberTicketsPerBuyOrClaim ?
          maxNumberTicketsPerBuyOrClaim.toString() : ''
    };

  } catch (error) {
    return {
      currentLotteryId: '',
      maxNumberTicketsPerBuyOrClaim: ''
    };
  }
}

export const viewUserInfoForLotteryId = async (
  account: string,
  lotteryId: string,
  cursor: number,
  perRequestLimit: number
): Promise<LotteryTicket[] | null> => {

  try {
    const data = await specialLotteryContract.viewUserInfoForLotteryId(account, lotteryId, cursor, perRequestLimit);
    return processRawTicketsReponse(data);

  } catch (error) {
    console.log('viewUserInfoForLotteryId', error);
    return null;
  }
}

export const fetchUserTicketsPerOneRound = async (
  account: string, lotteryId: string
): Promise<LotteryTicket[]> => {
  let cursor = 0;
  let numReturned = TICKET_LIMIT_PER_REQUEST;
  const ticketData: LotteryTicket[] = [];

  while (numReturned === TICKET_LIMIT_PER_REQUEST) {
    const response = await viewUserInfoForLotteryId(account, lotteryId, cursor, numReturned);
    if (response) {
      cursor += response?.length;
      ticketData.push(...response);
    }
    numReturned = response?.length ?? 0;
  }

  return ticketData;
}

export const fetchUserTicketsPerMultipleRounds = async (
  account: string, lotteryIds: string[],
): Promise<{ roundId: string; userTickets: LotteryTicket[] }[]> => {
  const ticketsForMultipleRounds = [];
  for (let idx = 0; idx < lotteryIds.length; idx++) {
    const roundId = lotteryIds[idx];
    const ticketsForRound = await fetchUserTicketsPerOneRound(account, roundId);
    ticketsForMultipleRounds.push({
      roundId,
      userTickets: ticketsForRound
    });
  }
  return ticketsForMultipleRounds;
}

export const useProcessLotteryResponse = (
  lotteryData: LotteryResponse & { userTickets?: LotteryRoundUserTickets }
): LotteryRound => {
  const {
    priceTicketInDehub: priceTicketInDehubAsString,
    amountCollectedInDehub: amountCollectedInDehubAsString
  } = lotteryData;

  const priceTicketInDehub = useMemo(() => {
    return new BigNumber(priceTicketInDehubAsString);
  }, [priceTicketInDehubAsString]);
  const amountCollectedInDehub = useMemo(() => {
    return new BigNumber(amountCollectedInDehubAsString);
  }, [amountCollectedInDehubAsString]);

  return {
    isLoading: lotteryData.isLoading,
    lotteryId: lotteryData.lotteryId,
    userTickets: lotteryData.userTickets,
    status: lotteryData.status,
    startTime: lotteryData.startTime,
    endTime: lotteryData.endTime,
    firstTicketId: lotteryData.firstTicketId,
    lastTicketId: lotteryData.lastTicketId,
    priceTicketInDehub,
    amountCollectedInDehub,
    deGrandMaximumWinners: lotteryData.deGrandMaximumWinners
  };
}

export const processLotteryResponse = (
  lotteryData: LotteryResponse & { userTickets?: LotteryRoundUserTickets }
): LotteryRound => {
  const {
    priceTicketInDehub: priceTicketInDehubAsString,
    amountCollectedInDehub: amountCollectedInDehubAsString
  } = lotteryData;

  const priceTicketInDehub = new BigNumber(priceTicketInDehubAsString);
  const amountCollectedInDehub = new BigNumber(amountCollectedInDehubAsString);

  return {
    isLoading: lotteryData.isLoading,
    lotteryId: lotteryData.lotteryId,
    userTickets: lotteryData.userTickets,
    status: lotteryData.status,
    startTime: lotteryData.startTime,
    endTime: lotteryData.endTime,
    firstTicketId: lotteryData.firstTicketId,
    lastTicketId: lotteryData.lastTicketId,
    priceTicketInDehub,
    amountCollectedInDehub,
    deGrandMaximumWinners: lotteryData.deGrandMaximumWinners
  };
}