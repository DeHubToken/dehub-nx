import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';

import { BUSD_DECIMALS } from '@dehub/shared/config';
import { BIG_ZERO, getBalanceNumber } from '@dehub/shared/utils';

import { Text } from '../../components/Text';
import { LotteryStatus } from '../../config/constants/types';
import { getDehubPrice, getBNBPrice } from '../../utils/priceDehub';

interface PrizePotProps {
  pot: BigNumber;
  status: LotteryStatus;
}

const PrizePot = ({ pot, status }: PrizePotProps) => {
  const [prizeInBusd, setPrizeInBusd] = useState<BigNumber>(BIG_ZERO);

  useEffect(() => {
    const calculate = async () => {
      const dehubPriceInBusd = await getDehubPrice();
      const prizeInBusdCalc = pot.times(dehubPriceInBusd);

      setPrizeInBusd(prizeInBusdCalc);
    };

    calculate();
  }, [pot]);

  return !prizeInBusd.isNaN() ? (
    <Text>${getBalanceNumber(prizeInBusd, BUSD_DECIMALS)}</Text>
  ) : (
    <Text>...</Text>
  );
};

export default PrizePot;
