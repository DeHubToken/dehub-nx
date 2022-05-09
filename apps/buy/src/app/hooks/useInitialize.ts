import { useEffect } from 'react';
import { environment } from '../../environments/environment';
import { useAppDispatch } from '../states';
import { setApplicationStatus } from '../states/application';
import { ApplicationStatus } from '../states/application/types';
import { replaceState } from '../states/swap';
import { useSwapState } from '../states/swap/hooks';
import { Field } from '../states/swap/types';
import { getPairAddress, getReserves } from '../utils/pairs';

const useInitialize = () => {
  const dispatch = useAppDispatch();

  const {
    [Field.Input]: { currencyId: inputCurrencyId },
    [Field.Output]: { currencyId: outputCurrencyId },
  } = useSwapState();

  useEffect(() => {
    if (!inputCurrencyId || !outputCurrencyId) {
      const currency0 = inputCurrencyId ?? environment.swap.defaultInput;
      const currency1 = outputCurrencyId ?? environment.swap.defaultOutput;

      dispatch(
        replaceState({
          inputCurrencyId: currency0,
          outputCurrencyId: currency1,
        })
      );
    }
  }, [dispatch, inputCurrencyId, outputCurrencyId]);

  useEffect(() => {
    const fetchInitialize = async () => {
      if (!inputCurrencyId || !outputCurrencyId) return;

      const pair = getPairAddress(inputCurrencyId, outputCurrencyId);
      const reserves = await getReserves(pair);
      if (!reserves) return;

      dispatch(
        replaceState({
          pair: {
            currencyId: pair,
            reserve0: reserves[0].toString(),
            reserve1: reserves[1].toString(),
          },
        })
      );
      dispatch(setApplicationStatus({ appStatus: ApplicationStatus.LIVE }));
    };

    fetchInitialize();
  }, [dispatch, inputCurrencyId, outputCurrencyId]);
};

export default useInitialize;
