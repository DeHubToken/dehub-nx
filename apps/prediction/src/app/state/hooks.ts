import { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useSelector } from 'react-redux';
import { orderBy } from 'lodash';

import { Hooks } from '@dehub/react/core';
import { Constants } from '@dehub/shared/config';

import { useAppDispatch } from '.';
import setBlock from './actions';
import { State } from './types';
import { getCanClaim } from './predictions/helpers';
import { getChainId } from '../config/constants';

export const usePollBlockNumber = () => {
  const dispatch = useAppDispatch();
  const { authProvider, chainId } = Hooks.useMoralisEthers();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (
        authProvider &&
        chainId === '0x' + Constants[getChainId()].CHAIN_ID_HEX
      ) {
        const blockNumber = await authProvider.getBlockNumber();
        dispatch(setBlock(blockNumber));
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [dispatch, authProvider, chainId]);
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
