import { useEffect, useRef, useState } from 'react';

import { getDehubAddress } from '../utils/addressHelpers';
import BigNumber from 'bignumber.js';
import { Hooks } from '@dehub/react/core';
import { getBep20Contract } from '../utils/contractHelpers';
import { BIG_ZERO } from '../utils/bigNumber';

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(BIG_ZERO);
  const { account } = Hooks.useMoralisEthers();
  const { fastRefresh } = Hooks.useRefresh();
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress);
      const res = await contract.balanceOf(account);
      if (!mountedRef.current) {
        return;
      }
      setBalance(new BigNumber(res.toString()));
    };

    if (account) {
      fetchBalance();
    }
  }, [account, tokenAddress, fastRefresh]);

  return balance;
};

export const useGetDehubBalance = () => {
  const balance = useTokenBalance(getDehubAddress());

  return balance;
};

export default useTokenBalance;
