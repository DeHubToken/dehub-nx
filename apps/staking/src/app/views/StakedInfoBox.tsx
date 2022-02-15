import { Heading, Text } from '@dehub/react/ui';
import { BUSD_DISPLAY_DECIMALS, DEHUB_DECIMALS } from '@dehub/shared/config';
import { getFullDisplayBalance } from '@dehub/shared/util';
import { Skeleton } from 'primereact/skeleton';
import {
  useDehubBusdPrice,
  usePoolInfo,
  usePullBlockNumber,
} from '../state/application/hooks';

const StakedInfoBox = () => {
  usePullBlockNumber();

  const dehubPrice = useDehubBusdPrice();
  const poolInfo = usePoolInfo();

  return (
    <>
      {' '}
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Heading className="pb-1">Total Staked</Heading>
              {poolInfo ? (
                <>
                  <Text fontSize="24px" fontWeight={900}>
                    {getFullDisplayBalance(
                      poolInfo?.totalStaked,
                      DEHUB_DECIMALS
                    )}
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
              <Heading className="pb-1">Rewards Q1 2022</Heading>
              {poolInfo ? (
                <>
                  <Text fontSize="24px" fontWeight={900}>
                    {getFullDisplayBalance(
                      poolInfo?.harvestFund,
                      DEHUB_DECIMALS
                    )}
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
              {poolInfo ? (
                <Text fontSize="24px" fontWeight={900}>
                  $
                  {getFullDisplayBalance(
                    dehubPrice.times(poolInfo?.totalStaked),
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
              {poolInfo ? (
                <>
                  <Text fontSize="24px" fontWeight={900}>
                    {getFullDisplayBalance(
                      poolInfo?.harvestFund,
                      DEHUB_DECIMALS
                    )}
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
