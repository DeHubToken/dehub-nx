import { useRefresh } from '@dehub/react/core';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '..';
import { AppState } from '../';
import { fetchDehubPrice } from './';

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
