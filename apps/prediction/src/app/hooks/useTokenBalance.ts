import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { Hooks } from '@dehub/react/core';
import { getBep20Contract } from '../utils/contractHelpers';
import { BIG_ZERO } from '../utils/bigNumber';

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(BIG_ZERO);
  const { account, signer } = Hooks.useMoralisEthers();
  const { fastRefresh } = Hooks.useRefresh();

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

export default useTokenBalance;
