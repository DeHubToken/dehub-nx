import { BUSD_DISPLAY_DECIMALS, DEHUB_DECIMALS } from '@dehub/shared/config';
import { getFullDisplayBalance } from '@dehub/shared/utils';
import { Skeleton } from 'primereact/skeleton';
import { Header, Text } from '../components/Text';
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
              <Header className="pb-2">Total Staked</Header>
              <br />
              {poolInfo ? (
                <Text fontSize="14px" fontWeight={900}>
                  {getFullDisplayBalance(poolInfo?.totalStaked, DEHUB_DECIMALS)}{' '}
                  $Dehub
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
              <Header className="pb-2">Rewards Q1 2022</Header>
              <br />
              {poolInfo ? (
                <Text fontSize="14px" fontWeight={900}>
                  {getFullDisplayBalance(poolInfo?.harvestFund, DEHUB_DECIMALS)}{' '}
                  $Dehub
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
      </div>
      <div className="grid mt-1 mb-4">
        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full flex flex-column align-items-start">
              <Header className="pb-2">TVL</Header>
              <br />
              {poolInfo ? (
                <Text fontSize="14px" fontWeight={900}>
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
              <Header className="pb-2">Total Rewards</Header>
              <br />
              {poolInfo ? (
                <Text fontSize="14px" fontWeight={900}>
                  {getFullDisplayBalance(poolInfo?.harvestFund, DEHUB_DECIMALS)}{' '}
                  $Dehub
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
      </div>
    </>
  );
};

export default StakedInfoBox;
