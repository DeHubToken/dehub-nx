import BigNumber from 'bignumber.js';
import erc20ABI from '../../config/abi/erc20.json';
import masterchefABI from '../../config/abi/masterchef.json';
import multicall, { Call } from '../../utils/multicall';
import { getAddress, getMasterChefAddress } from '../../utils/addressHelpers';
import { FarmConfig } from '../../config/constants/types';

interface StakedBalanceHex {
  _hex: BigNumber.Value;
}

export const fetchFarmUserAllowances = async (
  account: string,
  farmsToFetch: FarmConfig[]
) => {
  const masterChefAddress = getMasterChefAddress();

  const calls = farmsToFetch.map(farm => {
    const lpContractAddress = getAddress(farm.lpAddresses);
    return {
      address: lpContractAddress,
      name: 'allowance',
      params: [account, masterChefAddress],
    };
  });

  const rawLpAllowances = await multicall(erc20ABI, calls);
  const parsedLpAllowances = rawLpAllowances.map(
    (lpBalance: BigNumber.Value) => {
      return new BigNumber(lpBalance).toJSON();
    }
  );
  return parsedLpAllowances;
};

export const fetchFarmUserStakedBalances = async (
  account: string,
  farmsToFetch: FarmConfig[]
) => {
  const masterChefAddress = getMasterChefAddress();

  const calls = farmsToFetch.map(farm => {
    return {
      address: masterChefAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    };
  }) as Call[];

  const rawStakedBalances = await multicall(masterchefABI, calls);
  const parsedStakedBalances = rawStakedBalances.map(
    (stakedBalance: StakedBalanceHex[]) => {
      return new BigNumber(stakedBalance[0]._hex as BigNumber.Value).toJSON();
    }
  );
  return parsedStakedBalances;
};

export const fetchFarmUserEarnings = async (
  account: string,
  farmsToFetch: FarmConfig[]
) => {
  const masterChefAddress = getMasterChefAddress();

  const calls = farmsToFetch.map(farm => {
    return {
      address: masterChefAddress,
      name: 'pendingCake',
      params: [farm.pid, account],
    };
  }) as Call[];

  const rawEarnings = await multicall(masterchefABI, calls);
  const parsedEarnings = rawEarnings.map((earnings: BigNumber.Value) => {
    return new BigNumber(earnings).toJSON();
  });
  return parsedEarnings;
};
