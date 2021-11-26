import { useEffect, useState } from 'react';
import { Hooks } from '@dehub/react/core';
import { useChainlinkOracleContract } from '../../../hooks/useContract';
import { getBalanceAmount } from '../../../utils/formatBalance';
import { BIG_ZERO } from '../../../utils/bigNumber';

const useGetLatestOraclePrice = () => {
  const [price, setPrice] = useState(BIG_ZERO);
  const { lastUpdated, setLastUpdated: refresh } = Hooks.useLastUpdated();
  const chainlinkOracleContract = useChainlinkOracleContract();

  useEffect(() => {
    const fetchPrice = async () => {
      const response = await chainlinkOracleContract.latestAnswer();
      setPrice(getBalanceAmount(response.toString(), 8));
    };

    fetchPrice();
  }, [chainlinkOracleContract, lastUpdated, setPrice]);

  return { price, lastUpdated, refresh };
};

export default useGetLatestOraclePrice;
