import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';

import { WalletConnectingState } from '@dehub/shared/config';

import { fetchDehubPrice, setWalletConnectingState } from './';
import { useAppDispatch } from '..';
import { AppState } from '../store';

import useRefresh from '../../hooks/useRefresh';

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

export const usePullBusdPrice = () => {
  const dispatch = useAppDispatch();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    dispatch(fetchDehubPrice());
  }, [dispatch, slowRefresh]);
};
