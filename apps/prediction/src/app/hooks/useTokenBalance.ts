import { Hooks } from '@dehub/react/core';
import { BIG_ZERO } from '@dehub/shared/utils';
import BigNumber from 'bignumber.js';
import { useEffect, useRef, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { getDehubAddress } from '../utils/addressHelpers';
import { getBep20Contract } from '../utils/contractHelpers';

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(BIG_ZERO);
  const { account } = useMoralis();
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
