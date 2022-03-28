import { WalletConnectingState } from '@dehub/shared/model';
import { hexToDecimal } from '@dehub/shared/util';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo } from 'react';
import { useChain } from 'react-moralis';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '..';
import { AppState } from '../index';
import { fetchContracts, setWalletConnectingState } from './';
import { PoolInfo, SerializedPoolInfo, StakingContract } from './types';

export const useWalletConnectingState = (): WalletConnectingState => {
  return useSelector(
    (state: AppState) => state.application.walletConnectingState
  );
};

export const useSetWalletConnectingState = (): ((
  connectingState: WalletConnectingState
) => void) => {
  const dispatch = useAppDispatch();
  return useCallback(
    (connectingState: WalletConnectingState) => {
      dispatch(setWalletConnectingState({ connectingState }));
    },
    [dispatch]
  );
};

export const useDehubBusdPrice = (): BigNumber => {
  const dehubPriceAsString = useSelector(
    (state: AppState) => state.application.dehubPrice
  );

  const dehubPriceBusd = useMemo(() => {
    return new BigNumber(dehubPriceAsString);
  }, [dehubPriceAsString]);

  return dehubPriceBusd;
};

export const useFetchContracts = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContracts());
  }, [dispatch]);
};

export const useStakingContracts = (): StakingContract[] | undefined => {
  const { chainId } = useChain();

  const contracts = useSelector(
    (state: AppState) => state.application.contracts
  );

  return useMemo(() => {
    if (!chainId) return undefined;
    return contracts.filter(
      (contract: StakingContract) => contract.chainId === hexToDecimal(chainId)
    );
  }, [contracts, chainId]);
};

export const usePools = (): PoolInfo[] => {
  const pools = useSelector((state: AppState) => state.application.pools);

  return useMemo(
    () =>
      pools.map((pool: SerializedPoolInfo) => ({
        openTimeStamp: pool.openTimeStamp,
        closeTimeStamp: pool.closeTimeStamp,
        openBlock: pool.openBlock,
        closeBlock: pool.closeBlock,
        emergencyPull: pool.emergencyPull,
        harvestFund: new BigNumber(pool.harvestFund),
        lastUpdateBlock: new BigNumber(pool.lastUpdateBlock),
        valuePerBlock: new BigNumber(pool.valuePerBlock),
        totalStaked: new BigNumber(pool.totalStaked),
      })),
    [pools]
  );
};

export function useBlockNumber(): number | undefined {
  const { chainId } = useChain();

  return useSelector(
    (state: AppState) => state.application.blockNumber[chainId ?? -1]
  );
}
