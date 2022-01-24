import { Hooks } from '@dehub/react/core';
import { WalletConnectingState } from '@dehub/shared/models';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '..';
import { PoolInfo } from '../../config/constants/types';
import { AppState } from '../index';
import { fetchDehubPrice, fetchPoolInfo, setWalletConnectingState } from './';

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

  return poolInfo;
};

export const usePullBusdPrice = () => {
  const dispatch = useAppDispatch();
  const { slowRefresh } = Hooks.useRefresh();

  useEffect(() => {
    dispatch(fetchDehubPrice());
  }, [dispatch, slowRefresh]);
};

export const useFetchPoolInfo = () => {
  const dispatch = useAppDispatch();
  const { slowRefresh } = Hooks.useRefresh();

  useEffect(() => {
    dispatch(fetchPoolInfo());
  }, [dispatch, slowRefresh]);
};
