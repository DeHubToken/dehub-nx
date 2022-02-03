import {
  useDebounce,
  useIsBrowserTabActive,
  useRefresh,
} from '@dehub/react/core';
import { WalletConnectingState } from '@dehub/shared/models';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useChain, useMoralis } from 'react-moralis';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '..';
import { AppState } from '../index';
import {
  fetchDehubPrice,
  fetchPoolInfo,
  setWalletConnectingState,
  updateBlockNumber,
} from './';
import { PoolInfo } from './types';

export const useWalletConnectingState = (): WalletConnectingState => {
  return useSelector(
    (state: AppState) => state.application.walletConnectingState
  );
};

export const useSetWalletConnectingState = (): ((
  connectingState: WalletConnectingState
) => void) => {
  const dispatch = useAppDispatch();
  return useCallback(
    (connectingState: WalletConnectingState) => {
      dispatch(setWalletConnectingState({ connectingState }));
    },
    [dispatch]
  );
};

export const useDehubBusdPrice = (): BigNumber => {
  const dehubPriceAsString = useSelector(
    (state: AppState) => state.application.dehubPrice
  );

  const dehubPriceBusd = useMemo(() => {
    return new BigNumber(dehubPriceAsString);
  }, [dehubPriceAsString]);

  return dehubPriceBusd;
};

export const usePoolInfo = (): PoolInfo | undefined => {
  const poolInfo = useSelector((state: AppState) => state.application.poolInfo);

  return poolInfo
    ? {
        openTimeStamp: poolInfo.openTimeStamp,
        closeTimeStamp: poolInfo.closeTimeStamp,
        openBlock: poolInfo.openBlock,
        closeBlock: poolInfo.closeBlock,
        emergencyPull: poolInfo.emergencyPull,
        harvestFund: new BigNumber(poolInfo.harvestFund),
        lastUpdateBlock: new BigNumber(poolInfo.lastUpdateBlock),
        valuePerBlock: new BigNumber(poolInfo.valuePerBlock),
        totalStaked: new BigNumber(poolInfo.totalStaked),
      }
    : undefined;
};

export const usePullBusdPrice = () => {
  const dispatch = useAppDispatch();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    dispatch(fetchDehubPrice());
  }, [dispatch, slowRefresh]);
};

export const useFetchPoolInfo = () => {
  const dispatch = useAppDispatch();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    dispatch(fetchPoolInfo());
  }, [dispatch, slowRefresh]);
};

export const usePullBlockNumber = () => {
  const dispatch = useAppDispatch();
  const { chainId, web3 } = useMoralis();

  const isTabActive = useIsBrowserTabActive();

  const [state, setState] = useState<{
    chainId: string | null;
    blockNumber: number | null;
  }>({
    chainId,
    blockNumber: null,
  });

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState(prev => {
        if (chainId === prev.chainId) {
          if (typeof prev.blockNumber !== 'number')
            return {
              chainId,
              blockNumber,
            };
          return {
            chainId,
            blockNumber: Math.max(blockNumber, prev.blockNumber),
          };
        }
        return prev;
      });
    },
    [chainId, setState]
  );

  useEffect(() => {
    if (!web3 || !chainId || !isTabActive) return undefined;

    setState({ chainId, blockNumber: null });

    web3.getBlockNumber().then(blockNumberCallback);
    web3.on('block', blockNumberCallback);

    return () => {
      web3.removeListener('block', blockNumberCallback);
    };
  }, [web3, chainId, isTabActive, blockNumberCallback]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber || !isTabActive)
      return;
    dispatch(
      updateBlockNumber({
        chainId: debouncedState.chainId,
        blockNumber: debouncedState.blockNumber,
      })
    );
  }, [
    dispatch,
    isTabActive,
    debouncedState.chainId,
    debouncedState.blockNumber,
  ]);
};

export function useBlockNumber(): number | undefined {
  const { chainId } = useChain();

  return useSelector(
    (state: AppState) => state.application.blockNumber[chainId ?? -1]
  );
}
