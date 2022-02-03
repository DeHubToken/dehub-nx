import { Hooks } from '@dehub/react/core';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { useAppDispatch } from '../../../state';
import { useGetCurrentEpoch, useGetSortedRounds } from '../../../state/hooks';
import { fetchCurrentBets } from '../../../state/predictions';
import useSwiper from './useSwiper';

/**
 * Hooks for actions to be performed when the round changes
 */
const useOnNextRound = () => {
  const currentEpoch = useGetCurrentEpoch();
  const rounds = useGetSortedRounds();
  const { account } = useMoralis();
  const previousEpoch = Hooks.usePreviousValue(currentEpoch);
  const { swiper } = useSwiper();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      swiper &&
      currentEpoch !== undefined &&
      previousEpoch !== undefined &&
      currentEpoch !== previousEpoch
    ) {
      const currentEpochIndex = rounds.findIndex(
        round => round.epoch === currentEpoch
      );

      // Fetch data on current unclaimed bets
      dispatch(
        fetchCurrentBets({ account, roundIds: rounds.map(round => round.id) })
      );

      // Slide to the current LIVE round which is always the one before the current round
      swiper.slideTo(currentEpochIndex - 1);
      swiper.update();
    }
  }, [previousEpoch, currentEpoch, rounds, swiper, account, dispatch]);
};

export default useOnNextRound;
