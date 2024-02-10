import { useRefresh, useWeb3Context } from '@dehub/react/core';
import { BIG_ZERO } from '@dehub/shared/utils';
import BigNumber from 'bignumber.js';
import { useEffect, useRef, useState } from 'react';
import { FetchStatus } from '../config/constants/types';
import { CHAIN_INFO } from '../constants/chains';
import {
  useDstChain,
  useSourceChain,
  useTokenAmount,
} from '../state/application/hooks';
import { getDehubTokenContract } from '../utils/contractHelpers';
import { useBridgeContract } from './useContract';

type UseTokenBalanceState = {
  userBalance: BigNumber;
  bridgeBalance: BigNumber;
  fetchStatus: FetchStatus;
};

export const useTokenBalance = () => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    userBalance: BIG_ZERO,
    bridgeBalance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  });

  const { account, web3, chainId } = useWeb3Context();
  const { fastRefresh } = useRefresh();
  const { chain } = useSourceChain();
  const bridgeContract = useBridgeContract();
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const fetchBalance = async () => {
      if (!chain || chain.chainID !== chainId)
        return setBalanceState({
          userBalance: BIG_ZERO,
          bridgeBalance: BIG_ZERO,
          fetchStatus: NOT_FETCHED,
        });
      const contract = getDehubTokenContract(chain.chainID, web3?.getSigner());
      try {
        const userBalance = await contract['balanceOf'](account);
        const bridgeBalance = await contract['balanceOf'](
          bridgeContract?.address
        );
        if (!mountedRef.current) {
          return;
        }
        setBalanceState({
          userBalance: new BigNumber(userBalance.toString()),
          bridgeBalance: new BigNumber(bridgeBalance.toString()),
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
    } else {
      setBalanceState({
        userBalance: BIG_ZERO,
        bridgeBalance: BIG_ZERO,
        fetchStatus: NOT_FETCHED,
      });
    }
  }, [
    account,
    chain,
    web3,
    fastRefresh,
    NOT_FETCHED,
    SUCCESS,
    FAILED,
    chainId,
    bridgeContract?.address,
  ]);

  return balanceState;
};

export const useTokenDstBalance = () => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    userBalance: BIG_ZERO,
    bridgeBalance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  });

  const { account } = useWeb3Context();
  const { fastRefresh } = useRefresh();
  const { chain } = useDstChain();
  const chainId = chain?.chainID;
  const bridgeContract = useBridgeContract();
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const fetchBalance = async () => {
      if (!chain || chain.chainID !== chainId)
        return setBalanceState({
          userBalance: BIG_ZERO,
          bridgeBalance: BIG_ZERO,
          fetchStatus: NOT_FETCHED,
        });

      const contract = getDehubTokenContract(chain.chainID, null);
      try {
        const userBalance = await contract['balanceOf'](account);
        const bridgeBalance = await contract['balanceOf'](
          bridgeContract?.address
        );
        if (!mountedRef.current) {
          return;
        }
        setBalanceState({
          userBalance: new BigNumber(userBalance.toString()),
          bridgeBalance: new BigNumber(bridgeBalance.toString()),
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
    } else {
      setBalanceState({
        userBalance: BIG_ZERO,
        bridgeBalance: BIG_ZERO,
        fetchStatus: NOT_FETCHED,
      });
    }
  }, [
    account,
    chain,
    fastRefresh,
    NOT_FETCHED,
    SUCCESS,
    FAILED,
    chainId,
    bridgeContract?.address,
  ]);

  return balanceState;
};

export const useApproved = () => {
  const { web3, account } = useWeb3Context();
  const [{ approved, approvedAmount }, setApproved] = useState<{
    approved: boolean;
    approvedAmount: number;
  }>({ approved: false, approvedAmount: 0 });
  const { chain } = useSourceChain();
  const mountedRef = useRef(true);
  const { amount } = useTokenAmount();

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const fetchAllowance = async () => {
      if (!chain) return;
      const contract = getDehubTokenContract(chain.chainID, web3?.getSigner());
      try {
        const res = await contract['allowance'](
          account,
          CHAIN_INFO[chain.chainID].bridgeContract
        );
        if (!mountedRef.current) {
          return;
        }

        if (res >= Number(amount) * Math.pow(10, 18)) {
          setApproved({ approved: true, approvedAmount: res });
        } else {
          setApproved({ approved: false, approvedAmount: res });
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (account) {
      fetchAllowance();
    }
  }, [web3, account, amount, chain]);

  return { approved, approvedAmount };
};

export const useGetDehubBalance = () => {
  return useTokenBalance();
};

export const useGetDstDehubBalance = () => {
  return useTokenDstBalance();
  // return {
  //   userBalance: BigNumber(0),
  //   fetchStatus: FetchStatus.NOT_FETCHED,
  //   bridgeBalance: Number(0),
  // }
};

export default useTokenBalance;
