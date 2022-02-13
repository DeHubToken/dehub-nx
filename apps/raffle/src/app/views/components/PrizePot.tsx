import BigNumber from 'bignumber.js';
import { Skeleton } from 'primereact/skeleton';

import { DEHUB_DECIMALS } from '@dehub/shared/config';
import { getBalanceNumber } from '@dehub/shared/utils';

import { Text } from '../../components/Text';
import { LotteryStatus } from '../../config/constants/types';

interface PrizePotProps {
  pot: BigNumber;
  status: LotteryStatus;
}

const PrizePot = ({ pot, status }: PrizePotProps) => {
  return status !== LotteryStatus.PENDING &&
    status !== LotteryStatus.BURNED &&
    !pot.isNaN() ? (
    <>
      <Text fontSize="22px" className="inline-block">
        {getBalanceNumber(pot, DEHUB_DECIMALS)}
      </Text>
      <div className="w-full">
        <Text fontSize="12px" className="inline-block font-bold">
          &nbsp;$DeHub
        </Text>
      </div>
    </>
  ) : (
    <>
      <Skeleton width="100%" height="2.4rem" />
      <Skeleton width="100%" height="1.5rem" className="mt-2" />
    </>
  );
};

export default PrizePot;
