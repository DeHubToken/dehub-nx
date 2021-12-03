import { useEffect } from 'react';
import { Hooks } from '@dehub/react/core';
import { useAppDispatch } from '../../../state';
import { updateMarketData } from '../../../state/predictions';
import { fetchMarketData } from '../../../state/predictions/helpers2';

const POLL_TIME_IN_SECONDS = 10;

const usePollRoundData = () => {
  const dispatch = useAppDispatch();
  const { account } = Hooks.useMoralisEthers();

  useEffect(() => {
    const timer = setInterval(async () => {
      const marketData = await fetchMarketData();
      dispatch(updateMarketData(marketData));
    }, POLL_TIME_IN_SECONDS * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [account, dispatch]);
};

export default usePollRoundData;
