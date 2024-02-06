import { useRefresh } from '@dehub/react/core';
import { useEffect } from 'react';
import { useAppDispatch } from '../state';
import { fetchDehubPrice } from '../state/application';

export const usePullBusdPrice = () => {
  const dispatch = useAppDispatch();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    dispatch(fetchDehubPrice());
  }, [dispatch, slowRefresh]);
};
export default usePullBusdPrice;
