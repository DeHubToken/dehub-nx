import { useLastUpdated } from '@dehub/react/core';
import { BIG_ZERO, getBalanceAmount } from '@dehub/shared/utils';
import { useEffect, useState } from 'react';
import { useChainlinkOracleContract } from '../../../hooks/useContract';

const useGetLatestOraclePrice = () => {
  const [price, setPrice] = useState(BIG_ZERO);
  const { lastUpdated, setLastUpdated: refresh } = useLastUpdated();
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
