import { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useSelector } from 'react-redux';
import { orderBy } from 'lodash';
import { useAppDispatch } from '.';
import { getWeb3NoAccount } from '../utils/web3';
import { getBalanceAmount } from '../utils/formatBalance';
import { BIG_ZERO } from '../utils/bigNumber';
import { filterFarmsByQuoteToken } from '../utils/farmsPriceHelpers';
import setBlock from './actions';
import { State, Farm, FarmsState } from './types';
import { getCanClaim } from './predictions/helpers';

export const usePollBlockNumber = () => {
  const dispatch = useAppDispatch();
  const web3 = getWeb3NoAccount();

  useEffect(() => {
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber();
      dispatch(setBlock(blockNumber));
    }, 6000);

    return () => clearInterval(interval);
  }, [dispatch, web3]);
};

// Farms

export const useFarms = (): FarmsState => {
  const farms = useSelector((state: State) => state.farms);
  return farms;
};

export const useFarmFromPid = (pid: number): Farm => {
  const farm = useSelector((state: State) =>
    state.farms.data.find(f => f.pid === pid)
  ) as Farm;
  return farm;
};

export const useFarmFromLpSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) =>
    state.farms.data.find(f => f.lpSymbol === lpSymbol)
  ) as Farm;
  return farm;
};

export const useFarmUser = (pid: number) => {
  const farm = useFarmFromPid(pid);

  return {
    allowance: farm.userData
      ? new BigNumber(farm.userData.allowance)
      : BIG_ZERO,
    tokenBalance: farm.userData
      ? new BigNumber(farm.userData.tokenBalance)
      : BIG_ZERO,
    stakedBalance: farm.userData
      ? new BigNumber(farm.userData.stakedBalance)
      : BIG_ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
  };
};

// Return a farm for a given token symbol. The farm is filtered based on attempting to return a farm with a quote token from an array of preferred quote tokens
export const useFarmFromTokenSymbol = (
  tokenSymbol: string,
  preferredQuoteTokens?: string[]
): Farm => {
  const farms = useSelector((state: State) =>
    state.farms.data.filter(farm => farm.token.symbol === tokenSymbol)
  );
  const filteredFarm = filterFarmsByQuoteToken(farms, preferredQuoteTokens);
  return filteredFarm;
};

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPid = (pid: number): BigNumber => {
  const farm = useFarmFromPid(pid);
  return farm && new BigNumber(farm.token.busdPrice as BigNumber.Value);
};

export const useBusdPriceFromToken = (tokenSymbol: string): BigNumber => {
  const tokenFarm = useFarmFromTokenSymbol(tokenSymbol);
  const tokenPrice = useBusdPriceFromPid(tokenFarm?.pid as number);
  return tokenPrice;
};

export const useLpTokenPrice = (symbol: string) => {
  const farm = useFarmFromLpSymbol(symbol);
  const farmTokenPriceInUsd = useBusdPriceFromPid(farm.pid as number);
  let lpTokenPrice = BIG_ZERO;

  if (farm.lpTotalSupply && farm.lpTotalInQuoteToken) {
    // Total value of base token in LP
    const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(
      farm.tokenAmountTotal as BigNumber.Value
    );
    // Double it to get overall value in LP
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2);
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokens = getBalanceAmount(farm.lpTotalSupply);
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens);
  }

  return lpTokenPrice;
};

// API Prices

export const usePriceBnbBusd = (): BigNumber => {
  const bnbBusdFarm = useFarmFromPid(252);
  return new BigNumber(bnbBusdFarm.quoteToken.busdPrice as BigNumber.Value);
};

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block);
};

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock);
};

// Predictions
export const useIsHistoryPaneOpen = () => {
  return useSelector((state: State) => state.predictions.isHistoryPaneOpen);
};

export const useIsChartPaneOpen = () => {
  return useSelector((state: State) => state.predictions.isChartPaneOpen);
};

export const useGetRounds = () => {
  return useSelector((state: State) => state.predictions.rounds);
};

export const useGetSortedRounds = () => {
  const roundData = useGetRounds();
  return orderBy(Object.values(roundData), ['epoch'], ['asc']);
};

export const useGetCurrentEpoch = () => {
  return useSelector((state: State) => state.predictions.currentEpoch);
};

export const useGetIntervalBlocks = () => {
  return useSelector((state: State) => state.predictions.intervalBlocks);
};

export const useGetBufferBlocks = () => {
  return useSelector((state: State) => state.predictions.bufferBlocks);
};

export const useGetTotalIntervalBlocks = () => {
  const intervalBlocks = useGetIntervalBlocks();
  const bufferBlocks = useGetBufferBlocks();
  return intervalBlocks + bufferBlocks;
};

export const useGetRound = (id: string) => {
  const rounds = useGetRounds();
  return rounds[id];
};

export const useGetCurrentRound = () => {
  const currentEpoch = useGetCurrentEpoch();
  const rounds = useGetSortedRounds();
  return rounds.find(round => round.epoch === currentEpoch);
};

export const useGetPredictionsStatus = () => {
  return useSelector((state: State) => state.predictions.status);
};

export const useGetHistoryFilter = () => {
  return useSelector((state: State) => state.predictions.historyFilter);
};

export const useGetCurrentRoundBlockNumber = () => {
  return useSelector(
    (state: State) => state.predictions.currentRoundStartBlockNumber
  );
};

export const useGetMinBetAmount = () => {
  const minBetAmount = useSelector(
    (state: State) => state.predictions.minBetAmount
  );
  return useMemo(() => new BigNumber(minBetAmount), [minBetAmount]);
};

export const useGetIsFetchingHistory = () => {
  return useSelector((state: State) => state.predictions.isFetchingHistory);
};

export const useGetHistory = () => {
  return useSelector((state: State) => state.predictions.history);
};

export const useGetHistoryByAccount = (account: string | null | undefined) => {
  const bets = useGetHistory();
  if (account) return bets ? bets[account] : [];
  return [];
};

export const useGetBetByRoundId = (
  account: string | null | undefined,
  roundId: string
) => {
  const bets = useSelector((state: State) => state.predictions.bets);

  if (account && !bets[account]) {
    return null;
  }

  if (account && !bets[account][roundId]) {
    return null;
  }

  if (account) return bets[account][roundId];

  return null;
};

export const useBetCanClaim = (
  account: string | null | undefined,
  roundId: string
) => {
  const bet = useGetBetByRoundId(account, roundId);

  if (!bet) {
    return false;
  }

  return getCanClaim(bet);
};

export const useGetLastOraclePrice = (): BigNumber => {
  const lastOraclePrice = useSelector(
    (state: State) => state.predictions.lastOraclePrice
  );
  return new BigNumber(lastOraclePrice);
};
