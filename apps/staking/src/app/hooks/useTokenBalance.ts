import { useRefresh } from '@dehub/react/core';
import { BIG_ZERO } from '@dehub/shared/util';
import BigNumber from 'bignumber.js';
import { useEffect, useRef, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { FetchStatus } from '../config/constants/types';
import { getDehubAddress } from '../utils/addressHelpers';
import { getBep20Contract } from '../utils/contractHelpers';

type UseTokenBalanceState = {
  balance: BigNumber;
  fetchStatus: FetchStatus;
};

export const useTokenBalance = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  });

  const { account } = useMoralis();
  const { fastRefresh } = useRefresh();
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
      try {
        const res = await contract.balanceOf(account);
        if (!mountedRef.current) {
          return;
        }
        setBalanceState({
          balance: new BigNumber(res.toString()),
          fetchStatus: SUCCESS,
        });
      } catch (error) {
        console.error(error);
        setBalanceState(prev => ({
          ...prev,
          fetchStatus: FAILED,
        }));
      }
    };
    if (account) {
      fetchBalance();
    }
  }, [account, tokenAddress, fastRefresh, SUCCESS, FAILED]);

  return balanceState;
};

export const useGetDehubBalance = () => {
  const { balance } = useTokenBalance(getDehubAddress());

  return balance;
};

export default useTokenBalance;
