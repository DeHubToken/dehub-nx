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
      try {
        const dehubPriceInBusd = await getDehubPrice();
        const prizeInBusdCalc = pot.times(dehubPriceInBusd);

        if (mountedRef.current) {
          setPrizeInBusd(prizeInBusdCalc);
        }
      } catch (error) {
        console.log('calculate $DeHub in BUSD', error);
      }
    };

    calculate();
  }, [pot]);

  return status !== LotteryStatus.PENDING && !prizeInBusd.isNaN() ? (
    <>
      <Text fontSize="22px" className="inline-block">
        ${getBalanceNumber(prizeInBusd, BUSD_DECIMALS)}
      </Text>
      <>
        <Text fontSize="14px" className="inline-block">
          {`${getBalanceNumber(pot, DEHUB_DECIMALS)}`}
        </Text>
        <Text fontSize="12px" className="inline-block font-bold">
          &nbsp;$DeHub
        </Text>
      </>
    </>
  ) : (
    <>
      <Skeleton width="100%" height="2.4rem" />
      <Skeleton width="100%" height="1rem" className="mt-2" />
    </>
  );
};

export default PrizePot;
