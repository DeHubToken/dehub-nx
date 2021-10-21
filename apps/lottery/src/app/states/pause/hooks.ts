import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCurrentStandardPaused, fetchCurrentSpecialPaused } from '.';
import { useAppDispatch } from '..';
import useRefresh from '../../hooks/useRefresh';
import { State } from '../types';

export const useFetchPaused = () => {

  const { slowRefresh } = useRefresh();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentStandardPaused());
    dispatch(fetchCurrentSpecialPaused());
  }, [dispatch, slowRefresh]);
}

export const useGetStandardPaused = (): boolean => {
  return useSelector((state: State) => state.paused.standardPaused);
}

export const useGetSpecialPaused = (): boolean => {
  return useSelector((state: State) => state.paused.standardPaused);
}
