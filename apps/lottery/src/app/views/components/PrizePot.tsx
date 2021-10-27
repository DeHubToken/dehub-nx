import BigNumber from 'bignumber.js';
import { Skeleton } from 'primereact/skeleton';

import {
  BUSD_DECIMALS,
  DEHUB_DECIMALS,
  BUSD_DISPLAY_DECIMALS,
} from '@dehub/shared/config';
import {
  BIG_ZERO,
  getBalanceNumber,
  getFullDisplayBalance,
} from '@dehub/shared/utils';

import { Text } from '../../components/Text';
import { LotteryStatus } from '../../config/constants/types';
import { useDehubBusdPrice } from '../../states/application/hooks';

interface PrizePotProps {
  pot: BigNumber;
  status: LotteryStatus;
}

const PrizePot = ({ pot, status }: PrizePotProps) => {
  const dehubPriceInBusd = useDehubBusdPrice();
  const prizeInBusd = pot.times(dehubPriceInBusd);

  return status !== LotteryStatus.PENDING &&
    status !== LotteryStatus.BURNED &&
    !dehubPriceInBusd.isNaN() &&
    !pot.isNaN() ? (
    <>
      <Text fontSize="22px" className="inline-block">
        $
        {getFullDisplayBalance(
          prizeInBusd,
          BUSD_DECIMALS,
          BUSD_DISPLAY_DECIMALS
        )}
      </Text>
      <div className="w-full">
        <Text fontSize="14px" className="inline-block">
          {`${getBalanceNumber(pot, DEHUB_DECIMALS)}`}
        </Text>
        <Text fontSize="12px" className="inline-block font-bold">
          &nbsp;$DeHub
        </Text>
      </div>
    </>
  ) : (
    <>
      <Skeleton width="100%" height="2.4rem" />
      <Skeleton width="100%" height="1rem" className="mt-2" />
    </>
  );
};

export default PrizePot;
