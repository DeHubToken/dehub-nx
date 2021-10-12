import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { ethersToSerializedBigNumber } from '@dehub/shared/utils';
import {
  LotteryRound,
  LotteryResponse,
  LotteryRoundUserTickets
} from '../types';

import StandardLotteryAbi from '../../config/abis/StandardLottery.json';
import { LotteryStatus, LotteryTicket } from '../../config/constants/types';
import { TICKET_LIMIT_PER_REQUEST } from '../../config/constants';
import { getStandardLotteryAddress } from '../../utils/addressHelpers';
import { getStandardLotteryContract } from '../../utils/contractHelpers';
import { Call, multicallv2 } from '../../utils/multicall';

const standardLotteryContract = getStandardLotteryContract();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processViewLotterySuccessResponse = (response: any, lotteryId: string): LotteryResponse => {
  const {
    status,
    startTime,
    endTime,
    ticketRate,
    rewardBreakdown,
    countWinnersPerBracket,
    tokenPerBracket,
    amountCollectedToken,
    firstTicketId,
    firstTicketIdNextLottery,
    finalNumber
  } = response;

  const statusKey = Object.keys(LotteryStatus)[status];
  const serializedCountWinnersPerBracket = countWinnersPerBracket.map((winnersPerBracket: ethers.BigNumber) =>
    ethersToSerializedBigNumber(winnersPerBracket));
  const serializedTokenPerBracket = tokenPerBracket.map((tokenPerBracket: ethers.BigNumber) =>
    ethersToSerializedBigNumber(tokenPerBracket));
  const serializedRewardPerBracket = rewardBreakdown.map((reward: ethers.BigNumber) =>
    ethersToSerializedBigNumber(reward));

  return {
    isLoading: false,
    lotteryId,
    status: LotteryStatus[statusKey as keyof typeof LotteryStatus],
    startTime: startTime?.toString(),
    endTime: endTime?.toString(),
    firstTicketId: firstTicketId?.toString(),
    lastTicketId: firstTicketIdNextLottery?.toString(),
    finalNumber: parseInt(finalNumber, 10),
    priceTicketInDehub: ethersToSerializedBigNumber(ticketRate),
    amountCollectedInDehub: ethersToSerializedBigNumber(amountCollectedToken),
    dehubPerBracket: serializedTokenPerBracket,
    countWinnersPerBracket: serializedCountWinnersPerBracket,
    rewardsBreakdown: serializedRewardPerBracket
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
    finalNumber: 0,
    priceTicketInDehub: '',
    amountCollectedInDehub: '',
    dehubPerBracket: [],
    countWinnersPerBracket: [],
    rewardsBreakdown: []
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processRawTicketsReponse = (data: any): LotteryTicket[] => {
  const [ticketIds, ticketNumbers, claimStatuses,] = data;

  if (ticketIds.length > 0) {
    return ticketNumbers.map((ticketId: ethers.BigNumber, index: number) => {
      return {
        id: ticketId.toString(),
        number: ticketNumbers[index].toString(),
        status: claimStatuses[index]
      };
    })
  }
  return [];
}

export const fetchLottery = async (lotteryId: string): Promise<LotteryResponse> => {
  try {
    const lotteryData = await standardLotteryContract.viewLottery(lotteryId);
    return processViewLotterySuccessResponse(lotteryData, lotteryId);

  } catch (error) {
    return processViewLotteryAndError(lotteryId);
  }
}

export const fetchCurrentStandardLotteryIdAndMaxBuy = async () => {
  try {
    const calls: Call[] = [
      'currentLotteryId', 'maxNumberTicketsPerBuyOrClaim'
    ].map((method) => ({
      address: getStandardLotteryAddress(),
      name: method,
    }));

    const [[currentLotteryId], [maxNumberTicketsPerBuyOrClaim]] =
      (await multicallv2(
        StandardLotteryAbi,
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
    const data = await standardLotteryContract.viewUserInfoForLotteryId(account, lotteryId, cursor, perRequestLimit);
    return processRawTicketsReponse(data);

  } catch (error) {
    console.log('viewUserInfoForLotteryId', error);
    return null;
  }
}

export const fetchUserTicketsPerStandardLottery = async (
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

export const useProcessStandardLotteryResponse = (
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
    finalNumber: lotteryData.finalNumber,
    priceTicketInDehub,
    amountCollectedInDehub,
    dehubPerBracket: lotteryData.dehubPerBracket,
    countWinnersPerBracket: lotteryData.countWinnersPerBracket,
    rewardsBreakdown: lotteryData.rewardsBreakdown
  };
}

export const processStandardLotteryResponse = (
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
    finalNumber: lotteryData.finalNumber,
    priceTicketInDehub,
    amountCollectedInDehub,
    dehubPerBracket: lotteryData.dehubPerBracket,
    countWinnersPerBracket: lotteryData.countWinnersPerBracket,
    rewardsBreakdown: lotteryData.rewardsBreakdown
  };
}