import { useRefresh } from '@dehub/react/core';
import { BIG_ZERO } from '@dehub/shared/utils';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { ETHERToken, Token } from '../config/types';
import { getERC20Contract, getMultiCallContract } from '../utils/contracts';

type UseTokenBalanceState = {
  balance: BigNumber;
  fetchStatus: FetchStatus;
};

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export const useTokenBalanceWithLoadingIndicator = (
  account: string | null,
  token?: Token | null
) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;

  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  });

  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalance = async (
      account: string | null,
      token?: Token | null
    ) => {
      if (!account || !token) {
        setBalanceState({
          balance: BIG_ZERO,
          fetchStatus: NOT_FETCHED,
        });
        return;
      }

      try {
        if (token === ETHERToken) {
          const contract = getMultiCallContract();
          const res = await contract['getEthBalance'](account);
          setBalanceState({
            balance: new BigNumber(res.toString()),
            fetchStatus: SUCCESS,
          });
        } else {
          const contract = getERC20Contract(token.address);
          const res = await contract['balanceOf'](account);
          setBalanceState({
            balance: new BigNumber(res.toString()),
            fetchStatus: SUCCESS,
          });
        }
      } catch (error) {
        console.error(error);
        setBalanceState(prev => ({
          ...prev,
          fetchStatus: FAILED,
        }));
      }
    };

    fetchBalance(account, token);
  }, [account, fastRefresh, token, NOT_FETCHED, SUCCESS, FAILED]);

  return balanceState;
};

export default useTokenBalanceWithLoadingIndicator;
