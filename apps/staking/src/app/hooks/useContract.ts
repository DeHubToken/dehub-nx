import { getContract } from '@dehub/shared/utils';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { useMoralis } from 'react-moralis';
import {
  useStakingContracts,
  useStakingControllerContract,
} from '../state/application/hooks';
import {
  ContractProperties,
  StakingContractProperties,
} from '../state/application/types';
import { getBnbAddress, getDehubAddress } from '../utils/addressHelpers';
import { getBep20Contract, getRewardsContract } from '../utils/contractHelpers';

export function useContract(
  address?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ABI?: any,
  withSignerIfPossible = true
): Contract | null {
  const { account, web3 } = useMoralis();

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
  const { web3 } = useMoralis();
  return useMemo(
    () => (web3 ? getBep20Contract(getDehubAddress(), web3.getSigner()) : null),
    [web3]
  );
};

export const useBnbContract = (): Contract | null => {
  return useMemo(() => getBep20Contract(getBnbAddress()), []);
};

export const usePickStakingContract = (
  contractIndex: number
): Contract | null => {
  const { web3, account } = useMoralis();

  const contracts: StakingContractProperties[] | null = useStakingContracts();

  return useMemo(
    () =>
      web3 && account && contracts && contracts.length > contractIndex
        ? getContract(
            contracts[contractIndex].address,
            contracts[contractIndex].abi,
            web3,
            account
          )
        : null,
    [web3, account, contracts, contractIndex]
  );
};

export const usePickStakingControllerContract = (): Contract | null => {
  const { web3, account } = useMoralis();

  const controller: ContractProperties | null = useStakingControllerContract();

  return useMemo(
    () =>
      web3 && account && controller
        ? getContract(controller.address, controller.abi, web3, account)
        : null,
    [web3, account, controller]
  );
};

export const useRewardsContract = (): Contract | null => {
  const { web3 } = useMoralis();
  return useMemo(
    () => (web3 ? getRewardsContract(web3.getSigner()) : null),
    [web3]
  );
};
