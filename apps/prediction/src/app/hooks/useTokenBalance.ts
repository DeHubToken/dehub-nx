import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { Hooks } from '@dehub/react/core';
import { getBep20Contract, getCakeContract } from '../utils/contractHelpers';
import { BIG_ZERO } from '../utils/bigNumber';
import useRefresh from './useRefresh';
import useLastUpdated from './useLastUpdated';

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(BIG_ZERO);
  const { account, signer } = Hooks.useMoralisEthers();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, signer);
      const res = await contract.balanceOf(account);
      setBalance(new BigNumber(res.toString()));
    };

    if (account) {
      fetchBalance();
    }
  }, [account, tokenAddress, signer, fastRefresh]);

  return balance;
};

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh();
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const { signer } = Hooks.useMoralisEthers();

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getCakeContract(signer);
      const supply = await cakeContract.totalSupply();
      setTotalSupply(new BigNumber(supply));
    }

    fetchTotalSupply();
  }, [slowRefresh, signer]);

  return totalSupply;
};

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(BIG_ZERO);
  const { slowRefresh } = useRefresh();
  const { signer } = Hooks.useMoralisEthers();

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, signer);
      const res = await contract.balanceOf(
        '0x000000000000000000000000000000000000dEaD'
      );
      setBalance(new BigNumber(res));
    };

    fetchBalance();
  }, [tokenAddress, slowRefresh, signer]);

  return balance;
};

export const useGetBnbBalance = () => {
  const [balance, setBalance] = useState(BIG_ZERO);
  const { account, authProvider } = Hooks.useMoralisEthers();
  const { lastUpdated, setLastUpdated } = useLastUpdated();

  useEffect(() => {
    const fetchBalance = async () => {
      if (authProvider) {
        const walletBalance = await authProvider.getBalance(account as string);
        setBalance(new BigNumber(walletBalance.toString()));
      }
    };

    if (account && authProvider) {
      fetchBalance();
    }
  }, [account, lastUpdated, authProvider, setBalance]);

  return { balance, refresh: setLastUpdated };
};

export default useTokenBalance;
