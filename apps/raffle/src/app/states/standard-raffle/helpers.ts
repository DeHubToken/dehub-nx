import { BIG_ZERO, ethersToSerializedBigNumber } from '@dehub/shared/util';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import StandardLotteryAbi from '../../config/abis/StandardLottery.json';
import { TICKET_LIMIT_PER_REQUEST } from '../../config/constants';
import {
  LotteryStatus,
  LotteryTicket,
  LotteryTicketClaimData,
} from '../../config/constants/types';
import { getStandardLotteryAddress } from '../../utils/addressHelpers';
import { getStandardLotteryContract } from '../../utils/contractHelpers';
import { Call, multicallv2 } from '../../utils/multicall';
import {
  LotteryBundleRule,
  LotteryResponse,
  LotteryRound,
  LotteryRoundUserTickets,
  LotteryUserData,
  LotteryUserRound,
} from './types';

const standardLotteryContract = getStandardLotteryContract();

const processViewLotterySuccessResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any,
  lotteryId: string
): LotteryResponse => {
  const {
    status,
    startTime,
    endTime,
    ticketRate,
    rewardBreakdown,
    countWinnersPerBracket,
    tokenPerBracket,
    unwonPreviousPot,
    amountCollectedToken,
    firstTicketId,
    firstTicketIdNextLottery,
    finalNumber,
  } = response;

  const statusKey = Object.keys(LotteryStatus)[status];
  const serializedCountWinnersPerBracket = countWinnersPerBracket.map(
    (winnersPerBracket: EthersBigNumber) =>
      ethersToSerializedBigNumber(winnersPerBracket)
  );
  const serializedTokenPerBracket = tokenPerBracket.map(
    (tokenPerBracket: EthersBigNumber) =>
      ethersToSerializedBigNumber(tokenPerBracket)
  );
  const serializedRewardPerBracket = rewardBreakdown.map(
    (reward: EthersBigNumber) => ethersToSerializedBigNumber(reward)
  );
  const wrappedFinalNumber = finalNumber.mod(EthersBigNumber.from(100000000));

  return {
    isLoading: false,
    lotteryId,
    status: LotteryStatus[statusKey as keyof typeof LotteryStatus],
    startTime: startTime?.toString(),
    endTime: endTime?.toString(),
    firstTicketId: firstTicketId?.toString(),
    lastTicketId: firstTicketIdNextLottery?.toString(),
    finalNumber: wrappedFinalNumber.toNumber(),
    priceTicketInDehub: ethersToSerializedBigNumber(ticketRate),
    unwonPreviousPotInDehub: ethersToSerializedBigNumber(unwonPreviousPot),
    amountCollectedInDehub: ethersToSerializedBigNumber(amountCollectedToken),
    dehubPerBracket: serializedTokenPerBracket,
    countWinnersPerBracket: serializedCountWinnersPerBracket,
    rewardsBreakdown: serializedRewardPerBracket,
  };
};

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
    unwonPreviousPotInDehub: '',
    amountCollectedInDehub: '',
    dehubPerBracket: [],
    countWinnersPerBracket: [],
    rewardsBreakdown: [],
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processRawTicketsReponse = (data: any): LotteryTicket[] => {
  const [ticketIds, ticketNumbers, claimStatuses] = data;

  if (ticketIds.length > 0) {
    return ticketIds.map((ticketId: EthersBigNumber, index: number) => {
      return {
        id: ticketId.toString(),
        number: ticketNumbers[index].toString(),
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
    const lotteryData = await standardLotteryContract.viewLottery(lotteryId);
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
      address: getStandardLotteryAddress(),
      name: method,
    }));

    const [[currentLotteryId], [maxNumberTicketsPerBuyOrClaim]] =
      (await multicallv2(StandardLotteryAbi, calls)) as EthersBigNumber[][];

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

export const fetchLotteryBundleRules = async (): Promise<
  LotteryBundleRule[]
> => {
  try {
    const data = await standardLotteryContract.viewBundleRule();
    const [purchasedCounts, freeCounts] = data;

    return purchasedCounts.map(
      (purchasedCount: EthersBigNumber, index: number) => {
        return {
          index,
          purchasedCount: purchasedCount.toNumber(),
          freeCount: freeCounts[index].toNumber(),
        };
      }
    );
  } catch (error) {
    console.error('viewUserInfoForLotteryId', error);
    return [];
  }
};

export const viewUserInfoForLotteryId = async (
  account: string,
  lotteryId: string,
  cursor: number,
  perRequestLimit: number
): Promise<LotteryTicket[] | null> => {
  try {
    const data = await standardLotteryContract.viewUserInfoForLotteryId(
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
    status: lotteryData.status,
    startTime: lotteryData.startTime,
    endTime: lotteryData.endTime,
    firstTicketId: lotteryData.firstTicketId,
    lastTicketId: lotteryData.lastTicketId,
    finalNumber: lotteryData.finalNumber,
    priceTicketInDehub,
    unwonPreviousPotInDehub,
    amountCollectedInDehub,
    dehubPerBracket: lotteryData.dehubPerBracket,
    countWinnersPerBracket: lotteryData.countWinnersPerBracket,
    rewardsBreakdown: lotteryData.rewardsBreakdown,
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
    status: lotteryData.status,
    startTime: lotteryData.startTime,
    endTime: lotteryData.endTime,
    firstTicketId: lotteryData.firstTicketId,
    lastTicketId: lotteryData.lastTicketId,
    finalNumber: lotteryData.finalNumber,
    priceTicketInDehub,
    unwonPreviousPotInDehub,
    amountCollectedInDehub,
    dehubPerBracket: lotteryData.dehubPerBracket,
    countWinnersPerBracket: lotteryData.countWinnersPerBracket,
    rewardsBreakdown: lotteryData.rewardsBreakdown,
  };
};

export const processLotteryUserClaimData = (
  account: string,
  claimData: LotteryTicketClaimData[]
): LotteryUserData => {
  // Accumulate unclaimed amount
  let total: BigNumber = BIG_ZERO;
  claimData.forEach((reward: LotteryTicketClaimData) => {
    total = total.plus(reward.dehubTotal);
  });

  const rounds: LotteryUserRound[] = claimData.map(
    (claimItem: LotteryTicketClaimData) => {
      return {
        status: LotteryStatus.CLAIMABLE,
        roundId: claimItem.roundId,
        dehubTotal: claimItem.dehubTotal.toJSON(),
        ticketsWithUnclaimedRewards: claimItem.ticketsWithUnclaimedRewards,
        allWinningTickets: claimItem.allWinningTickets,
      };
    }
  );

  return {
    account,
    dehubTotal: total.toJSON(),
    rounds,
  };
};
