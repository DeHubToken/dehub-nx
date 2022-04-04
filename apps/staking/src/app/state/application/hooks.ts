import { useRefresh } from '@dehub/react/core';
import { WalletConnectingState } from '@dehub/shared/model';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo } from 'react';
import { useChain, useMoralis } from 'react-moralis';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '..';
import { getChainId } from '../../config/constants';
import { AppState } from '../index';
import {
  fetchContracts,
  fetchPendingHarvest,
  fetchUserInfos,
  setApplicationStatus,
  setPools,
  setWalletConnectingState,
} from './';
import { fetchPools, fetchPoolsPaused } from './helpers';
import {
  ApplicationStatus,
  ContractProperties,
  PoolInfoAndPaused,
  PoolUserInfo,
  SerializedPoolInfo,
  SerializedPoolInfoPaused,
  SerializedPoolUserInfo,
  StakingContractProperties,
} from './types';

export const useApplicationStatus = (): ApplicationStatus => {
  return useSelector((state: AppState) => state.application.applicationStatus);
};

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

export const useFetchPools = () => {
  const dispatch = useAppDispatch();
  const { slowRefresh, fastRefresh } = useRefresh();
  const { isInitialized, account } = useMoralis();

  const contracts: StakingContractProperties[] | null = useStakingContracts();

  useEffect(() => {
    if (isInitialized) {
      dispatch(fetchContracts());
    }
  }, [dispatch, isInitialized]);

  useEffect(() => {
    const fetchInitialize = async () => {
      if (!contracts || contracts.length < 1) return;
      const addresses = contracts.map(contract => contract.address);
      const abi = contracts[0].abi;

      const pools: SerializedPoolInfo[] | undefined = await fetchPools(
        abi,
        addresses
      );
      const pauses: boolean[] | undefined = await fetchPoolsPaused(
        abi,
        addresses
      );
      if (pools && pauses) {
        dispatch(
          setPools(
            pools.map((pool: SerializedPoolInfo, index: number) => ({
              ...pool,
              paused: pauses[index],
            }))
          )
        );
        dispatch(setApplicationStatus({ appStatus: ApplicationStatus.LIVE }));
      }
    };

    if (contracts && contracts.length > 0) {
      fetchInitialize();
    }
  }, [dispatch, contracts, slowRefresh]);

  useEffect(() => {
    if (account && contracts) {
      dispatch(fetchUserInfos({ contracts, staker: account }));
      dispatch(fetchPendingHarvest({ contracts, staker: account }));
    }
  }, [dispatch, account, contracts, fastRefresh]);
};

export const useStakingContracts = (): StakingContractProperties[] | null => {
  const chainId = getChainId();

  const contracts = useSelector(
    (state: AppState) => state.application.stakingContracts
  );

  return useMemo(() => {
    if (!contracts) return null;
    return contracts.filter(
      (contract: StakingContractProperties) => contract.chainId === chainId
    );
  }, [contracts, chainId]);
};

export const useStakingControllerContract = (): ContractProperties | null => {
  const controller = useSelector(
    (state: AppState) => state.application.stakingController
  );
  return controller;
};

export const useBNBRewardContract = (): ContractProperties | null => {
  const bnbRewardContract = useSelector(
    (state: AppState) => state.application.bnbRewardContract
  );
  return bnbRewardContract;
};

export const usePools = (): {
  pools: PoolInfoAndPaused[];
  poolsLoading: boolean;
} => {
  const pools = useSelector((state: AppState) => state.application.pools);
  const poolsLoading = useSelector(
    (state: AppState) => state.application.poolsLoading
  );

  return {
    pools: useMemo(
      () =>
        pools.map((pool: SerializedPoolInfoPaused) => ({
          openTimeStamp: pool.openTimeStamp,
          closeTimeStamp: pool.closeTimeStamp,
          openBlock: pool.openBlock,
          closeBlock: pool.closeBlock,
          emergencyPull: pool.emergencyPull,
          harvestFund: new BigNumber(pool.harvestFund),
          lastUpdateBlock: new BigNumber(pool.lastUpdateBlock),
          valuePerBlock: new BigNumber(pool.valuePerBlock),
          totalStaked: new BigNumber(pool.totalStaked),
          paused: pool.paused,
        })),
      [pools]
    ),
    poolsLoading,
  };
};

export const useStakes = (): {
  userInfos: PoolUserInfo[];
  userInfosLoading: boolean;
  pendingHarvestLoading: boolean;
} => {
  const userInfos = useSelector(
    (state: AppState) => state.application.userInfos
  );
  const userInfosLoading = useSelector(
    (state: AppState) => state.application.userInfosLoading
  );
  const pendingHarvestLoading = useSelector(
    (state: AppState) => state.application.pendingHarvestLoading
  );

  return {
    userInfos: useMemo(
      () =>
        userInfos.map((userInfo: SerializedPoolUserInfo) => ({
          amount: new BigNumber(userInfo.amount),
          reflectionDebt: new BigNumber(userInfo.reflectionDebt),
          reflectionPending: new BigNumber(userInfo.reflectionPending),
          harvestDebt: new BigNumber(userInfo.harvestDebt),
          harvestPending: new BigNumber(userInfo.harvestPending),
          harvested: userInfo.harvested,
          pendingHarvest: new BigNumber(userInfo.pendingHarvest),
        })),
      [userInfos]
    ),
    userInfosLoading,
    pendingHarvestLoading,
  };
};

export function useBlockNumber(): number | undefined {
  const { chainId } = useChain();

  return useSelector(
    (state: AppState) => state.application.blockNumber[chainId ?? -1]
  );
}
