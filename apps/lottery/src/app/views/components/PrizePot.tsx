import BigNumber from 'bignumber.js';
import { DEHUB_DECIMALS } from '@dehub/shared/config';
import { getBalanceNumber } from '@dehub/shared/utils';
import { Text } from '../../components/Text';
import usePriceDehubBusd from '../../hooks/usePriceDehubBusd';
import { LotteryStatus } from '../../config/constants/types';

interface PrizePotProps {
  pot: BigNumber;
  status: LotteryStatus;
}

const PrizePot = ({ pot, status }: PrizePotProps) => {
  const dehubPriceInBusd = usePriceDehubBusd();
  const prizeInBusd = pot.times(dehubPriceInBusd);
  const prizeTotal = getBalanceNumber(prizeInBusd, DEHUB_DECIMALS);

  return status === LotteryStatus.OPEN ? (
    !prizeInBusd.isNaN() ? (
      <Text>{prizeTotal} $DEHUB</Text>
    ) : (
      <Text>...</Text>
    )
  ) : (
    <Text>...</Text>
  );
};

export default PrizePot;
