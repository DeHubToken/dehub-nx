import { useRefresh } from '@dehub/react/core';
import { useEffect } from 'react';
import { useAppDispatch } from '../states';
import { fetchDehubPrice } from '../states/application';

export const usePullBusdPrice = () => {
  const dispatch = useAppDispatch();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    dispatch(fetchDehubPrice());
  }, [dispatch, slowRefresh]);
};
export default usePullBusdPrice;
