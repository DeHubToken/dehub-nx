import { ethersToSerializedBigNumber } from '@dehub/shared/utils';
import { Call, multicallv2 } from '../../utils/multicall';
import { SerializedPoolInfo } from './types';

export const fetchPools = async (
  abi: string[],
  addresses: string[]
): Promise<SerializedPoolInfo[] | undefined> => {
  try {
    const calls: Call[] = addresses.map(address => ({
      name: 'pool',
      address,
    }));

    const pools = await multicallv2(abi, calls);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return pools.map((poolInfo: any) => ({
      openTimeStamp: Number(poolInfo?.openTimeStamp),
      closeTimeStamp: Number(poolInfo?.closeTimeStamp),
      openBlock: Number(poolInfo?.openBlock),
      closeBlock: Number(poolInfo?.closeBlock),
      emergencyPull: poolInfo?.emergencyPull,
      harvestFund: ethersToSerializedBigNumber(poolInfo?.harvestFund),
      lastUpdateBlock: ethersToSerializedBigNumber(poolInfo?.lastUpdateBlock),
      valuePerBlock: ethersToSerializedBigNumber(poolInfo?.valuePerBlock),
      totalStaked: ethersToSerializedBigNumber(poolInfo?.totalStaked),
    }));
  } catch (error) {
    console.error(error);
  }
  return undefined;
};

export const fetchPoolsPaused = async (
  abi: string[],
  addresses: string[]
): Promise<boolean[] | undefined> => {
  try {
    const calls: Call[] = addresses.map(address => ({
      name: 'paused',
      address,
    }));

    const pauseds = await multicallv2(abi, calls);
    return pauseds.map((paused: boolean[]) => paused[0]);
  } catch (error) {
    console.error(error);
  }
  return undefined;
};
