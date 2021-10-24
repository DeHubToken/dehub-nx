import { useEffect, useRef, useState } from 'react';
import BigNumber from 'bignumber.js';
import { Skeleton } from 'primereact/skeleton';

import { BUSD_DECIMALS, DEHUB_DECIMALS } from '@dehub/shared/config';
import { BIG_ZERO, getBalanceNumber } from '@dehub/shared/utils';

import { Text } from '../../components/Text';
import { LotteryStatus } from '../../config/constants/types';
import { getDehubPrice, getBNBPrice } from '../../utils/priceDehub';

interface PrizePotProps {
  pot: BigNumber;
  status: LotteryStatus;
}

const PrizePot = ({ pot, status }: PrizePotProps) => {
  const [prizeInBusd, setPrizeInBusd] = useState<BigNumber>(new BigNumber(NaN));
  // https://stackoverflow.com/questions/56450975/to-fix-cancel-all-subscriptions-and-asynchronous-tasks-in-a-useeffect-cleanup-f
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const calculate = async () => {
      const dehubPriceInBusd = await getDehubPrice();
      const prizeInBusdCalc = pot.times(dehubPriceInBusd);

      if (mountedRef.current) {
        setPrizeInBusd(prizeInBusdCalc);
      }
    };

    calculate();
  }, [pot]);

  return status !== LotteryStatus.PENDING && !prizeInBusd.isNaN() ? (
    <Text>
      {`${getBalanceNumber(pot, DEHUB_DECIMALS)} $DeHub / $${getBalanceNumber(
        prizeInBusd,
        BUSD_DECIMALS
      )}`}
    </Text>
  ) : (
    <Skeleton width="100%" height="2rem" />
  );
};

export default PrizePot;
