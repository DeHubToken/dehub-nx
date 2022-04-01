import { Heading, Text } from '@dehub/react/ui';
import { BUSD_DISPLAY_DECIMALS, DEHUB_DECIMALS } from '@dehub/shared/config';
import { BIG_ZERO, getFullDisplayBalance } from '@dehub/shared/util';
import BigNumber from 'bignumber.js';
import { Skeleton } from 'primereact/skeleton';
import { useEffect, useMemo, useState } from 'react';
import { useDehubBusdPrice, usePools } from '../state/application/hooks';
import { PoolInfo } from '../state/application/types';
import { isLivePool, quarterMark } from '../utils/pool';

interface StakeInfo {
  totalStaked: BigNumber;
  currentReward: BigNumber;
  totalReward: BigNumber;
}

const StakedInfoBox = () => {
  const [info, setInfo] = useState<StakeInfo>({
    totalStaked: BIG_ZERO,
    currentReward: BIG_ZERO,
    totalReward: BIG_ZERO,
  });

  const dehubPrice = useDehubBusdPrice();
  const { pools } = usePools();

  useEffect(() => {
    setInfo(
      pools.reduce(
        (prev, current, currentIndex) => ({
          totalStaked: prev.totalStaked.plus(current.totalStaked),
          currentReward: prev.currentReward.plus(
            isLivePool(current) ? current.harvestFund : BIG_ZERO
          ),
          totalReward: prev.totalReward.plus(current.harvestFund),
        }),
        {
          totalStaked: BIG_ZERO,
          currentReward: BIG_ZERO,
          totalReward: BIG_ZERO,
        }
      )
    );
  }, [pools]);

  const activePool = useMemo(() => {
    const livePools = pools.filter((pool: PoolInfo) => isLivePool(pool));
    return livePools.length > 0 ? livePools[0] : undefined;
  }, [pools]);

  return (
    <>
      {' '}
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Heading className="pb-1">Total Staked</Heading>
              {pools ? (
                <>
                  <Text fontSize="24px" fontWeight={900}>
                    {getFullDisplayBalance(info.totalStaked, DEHUB_DECIMALS)}
                  </Text>
                  <Text>$DeHub</Text>
                </>
              ) : (
                <>
                  <Skeleton width="100%" height="1.5rem" />
                  <Skeleton width="100%" height="1.5rem" className="mt-2" />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              {/* TODO: pull the current live vault data here. */}
              <Heading className="pb-1">
                Rewards {activePool && quarterMark(activePool)}
              </Heading>
              {pools ? (
                <>
                  <Text fontSize="24px" fontWeight={900}>
                    {getFullDisplayBalance(info.currentReward, DEHUB_DECIMALS)}
                  </Text>
                  <Text>$DeHub</Text>
                </>
              ) : (
                <>
                  <Skeleton width="100%" height="1.5rem" />
                  <Skeleton width="100%" height="1.5rem" className="mt-2" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid mt-1 mb-4">
        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full flex flex-column align-items-start">
              <Heading className="pb-1">TVL</Heading>
              {pools ? (
                <Text fontSize="24px" fontWeight={900}>
                  $
                  {getFullDisplayBalance(
                    dehubPrice.times(info.totalStaked),
                    DEHUB_DECIMALS,
                    BUSD_DISPLAY_DECIMALS
                  )}
                </Text>
              ) : (
                <>
                  <Skeleton width="100%" height="1.5rem" />
                  <Skeleton width="100%" height="1.5rem" className="mt-2" />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Heading className="pb-1">Total Rewards</Heading>
              {pools ? (
                <>
                  <Text fontSize="24px" fontWeight={900}>
                    {getFullDisplayBalance(info.totalReward, DEHUB_DECIMALS)}
                  </Text>
                  <Text>$DeHub</Text>
                </>
              ) : (
                <>
                  <Skeleton width="100%" height="1.5rem" />
                  <Skeleton width="100%" height="1.5rem" className="mt-2" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakedInfoBox;
