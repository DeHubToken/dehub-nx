import { BIG_ZERO, ethersToSerializedBigNumber } from '@dehub/shared/util';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import BigNumber from 'bignumber.js';
import StandardLotteryAbi from '../../config/abis/StandardLottery.json';
import {
  LotteryStatus,
  LotteryTicket,
  LotteryTicketClaimData,
} from '../../config/constants/types';
import { getStandardLotteryAddress } from '../../utils/addressHelpers';
import { Call, multicallv2 } from '../../utils/multicall';
import { fetchUserTicketsPerMultipleRounds } from './helpers';
import { LotteryUserData, LotteryUserRound } from './types';

interface LotteryStatusAndFinalNumber {
  roundId: string;
  status: LotteryStatus;
  finalNumber: string;
}

interface RoundDataAndUserTickets {
  roundId: string;
  userTickets: LotteryTicket[];
  finalNumber: string;
}

const fetchDehubRewardsForTickets = async (
  winningTickets: LotteryTicket[]
): Promise<{
  ticketsWithUnclaimedRewards: LotteryTicket[];
  dehubTotal: BigNumber;
}> => {
  const calls: Call[] = winningTickets.map(winningTicket => {
    const { roundId, id, rewardBracket } = winningTicket;
    return {
      name: 'viewRewardsForTicketId',
      address: getStandardLotteryAddress(),
      params: [roundId, id, rewardBracket],
    };
  });

  try {
    const dehubRewards = await multicallv2(StandardLotteryAbi, calls);

    const dehubTotal = dehubRewards.reduce(
      (accum: BigNumber, dehubReward: EthersBigNumber) => {
        return accum.plus(new BigNumber(dehubReward.toString()));
      },
      BIG_ZERO
    );

    const ticketsWithUnclaimedRewards: LotteryTicket[] = winningTickets.map(
      (winningTicket, index) => {
        return {
          ...winningTicket,
          dehubReward: ethersToSerializedBigNumber(dehubRewards[index]), // Serialize BigNumber so as to save in redux
        };
      }
    );

    return { ticketsWithUnclaimedRewards, dehubTotal };
  } catch (error) {
    console.error(error);
    return {
      ticketsWithUnclaimedRewards: [],
      dehubTotal: BIG_ZERO,
    };
  }
};

/**
 * Get reward bracket matched by ticket number
 * @param ticketNumber
 * @param finalNumber
 * @returns 0 = 1 match, 1 = 2 match, 2 = 3 match, 3 = all match
 */
const getRewardBracketByNumber = (
  ticketNumber: string,
  finalNumber: string
): number => {
  const ticketNumberAsArray = ticketNumber.split('').reverse();
  const winningNumbersAsArray = finalNumber.split('').reverse();
  const matchingNumbers = [];

  // ticketNumber is from 100000000 to 118181818, ignore first 1 number
  for (let idx = 0; idx < winningNumbersAsArray.length - 1; idx++) {
    if (ticketNumberAsArray[idx] !== winningNumbersAsArray[idx]) {
      break;
    }
    matchingNumbers.push(ticketNumberAsArray[idx]);
  }
  return Math.floor(matchingNumbers.length / 2) - 1;
};

const getWinningTickets = async (
  roundDataAndUserTickets: RoundDataAndUserTickets
): Promise<LotteryTicketClaimData> => {
  const { roundId, userTickets, finalNumber } = roundDataAndUserTickets;

  // Match ticket numbers with final number and get reward bracket index
  const ticketsWithRewardBrackets = userTickets.map(ticket => {
    return {
      id: ticket.id,
      number: ticket.number,
      claimed: ticket.claimed,
      roundId,
      rewardBracket: getRewardBracketByNumber(ticket.number, finalNumber),
    };
  });

  const allWinningTickets = ticketsWithRewardBrackets.filter(ticket => {
    return ticket.rewardBracket > 0;
  });

  // Any ticket wining a higher tier reward cancels all rewards for lower reward tiers winning tickets
  let maximumMatched = 0;
  allWinningTickets.forEach(value => {
    maximumMatched =
      maximumMatched > value.rewardBracket
        ? maximumMatched
        : value.rewardBracket;
  });

  const unclaimedWinningTickets = allWinningTickets.filter(ticket => {
    return !ticket.claimed && ticket.rewardBracket === maximumMatched;
  });

  if (unclaimedWinningTickets.length > 0) {
    // Fetch reward amount by passing winning ticket ids and its bracket index.
    const { ticketsWithUnclaimedRewards, dehubTotal } =
      await fetchDehubRewardsForTickets(unclaimedWinningTickets);
    if (dehubTotal.eq(BIG_ZERO)) {
      // it does not have claimable tickets
      /*
       * Even though numbers are matched, it could be a maximum match in the current round.
       * If not a maximum matching, claimable amount can be zero.
       */
      return {
        ticketsWithUnclaimedRewards: [],
        allWinningTickets: [],
        dehubTotal,
        roundId,
        status: LotteryStatus.CLAIMABLE,
      };
    }
    return {
      ticketsWithUnclaimedRewards,
      allWinningTickets,
      dehubTotal,
      roundId,
      status: LotteryStatus.CLAIMABLE,
    };
  }

  return {
    ticketsWithUnclaimedRewards: [],
    allWinningTickets,
    dehubTotal: BIG_ZERO,
    roundId,
    status: LotteryStatus.CLAIMABLE,
  };
};

const fetchLotteryFinalNumbers = async (
  roundIds: string[]
): Promise<LotteryStatusAndFinalNumber[]> => {
  const calls: Call[] = roundIds.map(roundId => {
    return {
      name: 'viewLotteryDrawable',
      address: getStandardLotteryAddress(),
      params: [roundId],
    };
  });

  try {
    const statusAndFinalNumbers = await multicallv2(StandardLotteryAbi, calls);

    const finalNumbers = statusAndFinalNumbers.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (statusAndFinalNumber: any, index: number) => {
        const statusKey = Object.keys(LotteryStatus)[statusAndFinalNumber[0]];

        return {
          roundId: roundIds[index],
          status: LotteryStatus[statusKey as keyof typeof LotteryStatus],
          finalNumber: ethersToSerializedBigNumber(statusAndFinalNumber[1]),
        };
      }
    );

    return finalNumbers;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const findFinalNumberForRound = (
  targetRoundId: string,
  roundsData: LotteryStatusAndFinalNumber[]
) => {
  const targetRound = roundsData.find(
    roundData => roundData.roundId === targetRoundId
  );
  return targetRound?.finalNumber ?? '';
};

export const fetchUnclaimedUserRewards = async (
  account: string,
  userData: LotteryUserData,
  lotteryId: string,
  requestSize: number
): Promise<LotteryTicketClaimData[]> => {
  if (requestSize < 1) {
    return [];
  }

  const { rounds } = userData;

  const previousRounds =
    userData.account.length > 0 &&
    account.toLocaleLowerCase() !== userData.account.toLocaleLowerCase()
      ? []
      : rounds;

  // Collect all the round ids to fetch unclaimed rewards
  const roundId: number = parseInt(lotteryId);
  const roundsToCheck = [lotteryId];
  for (let idx = 1; roundId - idx > 0 && idx < requestSize; idx++) {
    // If already fetched winning tickets and rewards, ignore
    const found = previousRounds.find((round: LotteryUserRound) => {
      const prevRoundId = parseInt(round.roundId, 10);
      return (
        prevRoundId === roundId - idx &&
        (round.status === LotteryStatus.CLAIMABLE ||
          round.status === LotteryStatus.BURNED)
      );
    });
    if (found) {
      continue;
    }
    roundsToCheck.push((roundId - idx).toString());
  }

  // Fetch all the final numbers and round status per rounds
  const statusAndFinalNumbers = await fetchLotteryFinalNumbers(roundsToCheck);
  // Only claim claimable rounds
  const claimableRounds = statusAndFinalNumbers.filter(statusAndFinalNumber => {
    return (
      (statusAndFinalNumber.status === LotteryStatus.CLAIMABLE ||
        statusAndFinalNumber.status === LotteryStatus.BURNED) &&
      statusAndFinalNumber.finalNumber.length > 0
    );
  });

  /**
   * statusAndFinalNumbers and claimableRounds should have the same length
   * if it didn't have maintenance period.
   */

  const roundsWaitingToClaim = claimableRounds.map(
    (item: LotteryStatusAndFinalNumber): LotteryTicketClaimData => {
      return {
        ticketsWithUnclaimedRewards: [],
        allWinningTickets: [],
        dehubTotal: BIG_ZERO,
        roundId: item.roundId,
        status: item.status,
      };
    }
  );

  if (claimableRounds.length < 1) {
    return roundsWaitingToClaim;
  }

  /**
   * The whole DeLotto stage per month starts from the next of burned round
   * in the previous month to the last round this month to be burned.
   * Maximum times of round is 100, however all the rounds to be checked are
   * from the next of burned round in the previous month
   */
  // Round id is sorted in decending order in claimableRounds
  const burnedIndex = claimableRounds.findIndex(
    (item: LotteryStatusAndFinalNumber) => item.status === LotteryStatus.BURNED
  );

  // Fetch all the user tickets per claimable rounds(played after burned round)
  const idsToCheck = claimableRounds
    .filter((item, index) => burnedIndex < 0 || index < burnedIndex)
    .map(item => item.roundId);
  const userTicketData = await fetchUserTicketsPerMultipleRounds(
    account,
    idsToCheck
  );
  const roundsWithTickets = userTicketData.filter(
    roundData => roundData.userTickets.length > 0
  );

  const roundDataAndWinningTickets = roundsWithTickets.map(
    (roundData): RoundDataAndUserTickets => {
      return {
        ...roundData,
        finalNumber: findFinalNumberForRound(
          roundData.roundId,
          claimableRounds
        ),
      };
    }
  );

  // Get all winning tickets/unclaimed tickets and reward amount by matching final numbers
  const winningTickets = await Promise.all(
    roundDataAndWinningTickets.map(roundData => getWinningTickets(roundData))
  );

  // Filter unclaimed tickets
  const roundsWithUnclaimedWinningTickets = winningTickets.filter(
    winninTicketData => winninTicketData.ticketsWithUnclaimedRewards.length > 0
  );

  // Replace duplicated entry items
  const roundsClaimData = roundsWaitingToClaim.map(
    (roundClaimData: LotteryTicketClaimData) => {
      const index = roundsWithUnclaimedWinningTickets.findIndex(
        item => item.roundId === roundClaimData.roundId
      );
      return index >= 0
        ? roundsWithUnclaimedWinningTickets[index]
        : roundClaimData;
    }
  );

  return roundsClaimData;
};
