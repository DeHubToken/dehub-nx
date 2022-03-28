import { useRefresh } from '@dehub/react/core';
import { useEffect } from 'react';
import { useAppDispatch } from '../state';
import { fetchPools } from '../state/application';
import { useStakingContracts } from '../state/application/hooks';
import { StakingContract } from '../state/application/types';

export const useFetchPools = () => {
  const dispatch = useAppDispatch();
  const { slowRefresh } = useRefresh();

  const contracts: StakingContract[] | undefined = useStakingContracts();

  useEffect(() => {
    if (contracts && contracts.length > 0) {
      const addresses = contracts.map(contract => contract.address);
      const abi = contracts[0].abi;
      dispatch(fetchPools({ abi, addresses }));
    }
  }, [dispatch, contracts, slowRefresh]);
};
