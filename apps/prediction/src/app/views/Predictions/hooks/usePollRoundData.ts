import { useEffect } from 'react';
import { Hooks } from '@dehub/react/core';
import { useAppDispatch } from '../../../state';
import { updateMarketData } from '../../../state/predictions';
import { getMarketData } from '../../../state/predictions/helpers';

const POLL_TIME_IN_SECONDS = 10;

const usePollRoundData = () => {
  const dispatch = useAppDispatch();
  const { account } = Hooks.useMoralisEthers();

  useEffect(() => {
    const timer = setInterval(async () => {
      const marketData = await getMarketData();
      dispatch(updateMarketData(marketData));
    }, POLL_TIME_IN_SECONDS * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [account, dispatch]);
};

export default usePollRoundData;
