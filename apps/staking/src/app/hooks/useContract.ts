import { useWeb3Context } from '@dehub/react/core';
import { getContract } from '@dehub/shared/utils';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { getChainId } from '../config/constants';
import {
  useBNBRewardContract,
  useStakingContracts,
  useStakingControllerContract,
} from '../state/application/hooks';
import {
  ContractProperties,
  StakingContractProperties,
} from '../state/application/types';
import { getBnbAddress, getDehubAddress } from '../utils/addressHelpers';
import { getBep20Contract } from '../utils/contractHelpers';

export function useContract(
  address?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ABI?: any,
  withSignerIfPossible = true
): Contract | null {
  const { account, web3 } = useWeb3Context();

  return useMemo(() => {
    if (!address || !ABI || !web3) return null;
    try {
      return getContract(
        address,
        ABI,
        web3,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, withSignerIfPossible, web3, account]);
}

export const useDehubContract = (): Contract | null => {
  const { web3, chainId } = useWeb3Context();

  return useMemo(
    () =>
      web3 && chainId === getChainId()
        ? getBep20Contract(getDehubAddress(), web3.getSigner())
        : null,
    [web3, chainId]
  );
};

export const useBnbContract = (): Contract | null => {
  return useMemo(() => getBep20Contract(getBnbAddress()), []);
};

export const usePickStakingContract = (
  contractIndex: number
): Contract | null => {
  const { web3, account, chainId } = useWeb3Context();

  const contracts: StakingContractProperties[] | null = useStakingContracts();

  return useMemo(
    () =>
      web3 &&
      account &&
      contracts &&
      contracts.length > contractIndex &&
      chainId === contracts[contractIndex].chainId
        ? getContract(
            contracts[contractIndex].address,
            contracts[contractIndex].abi,
            web3,
            account
          )
        : null,
    [web3, account, chainId, contracts, contractIndex]
  );
};

export const usePickStakingControllerContract = (): Contract | null => {
  const { web3, account, chainId } = useWeb3Context();

  const controller: ContractProperties | null = useStakingControllerContract();

  return useMemo(
    () =>
      web3 && account && controller && chainId === controller.chainId
        ? getContract(controller.address, controller.abi, web3, account)
        : null,
    [web3, account, chainId, controller]
  );
};

export const usePickBNBRewardsContract = (): Contract | null => {
  const { web3, account, chainId } = useWeb3Context();

  const contract: ContractProperties | null = useBNBRewardContract();

  return useMemo(
    () =>
      web3 && account && contract && chainId === contract.chainId
        ? getContract(contract.address, contract.abi, web3, account)
        : null,
    [web3, account, chainId, contract]
  );
};
