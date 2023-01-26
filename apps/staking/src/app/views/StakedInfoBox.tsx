import { Heading, Text } from '@dehub/react/ui';
import {
  BUSD_DISPLAY_DECIMALS,
  DEHUB_DECIMALS,
  DEHUB_DISPLAY_DECIMALS,
} from '@dehub/shared/config';
import { getFullDisplayBalance } from '@dehub/shared/utils';
import { Skeleton } from 'primereact/skeleton';
import { useDehubBusdPrice, usePool } from '../state/application/hooks';

const StakedInfoBox = () => {
  const dehubPrice = useDehubBusdPrice();
  const { poolInfo } = usePool();

  return (
    <div className="grid">
      <div className="col-12 md:col-4 lg:col-4">
        <div className="card overview-box gray shadow-2">
          <div className="text-center w-full">
            {poolInfo ? (
              <>
                <Text fontSize="24px" fontWeight={900} textAlign="center">
                  {getFullDisplayBalance(
                    poolInfo.totalStaked,
                    DEHUB_DECIMALS,
                    DEHUB_DISPLAY_DECIMALS
                  )}{' '}
                  $DHB
                </Text>
                <Heading className="pb-1">Total Staked</Heading>
              </>
            ) : (
              <Skeleton width="100%" height="1.5rem" />
            )}
          </div>
        </div>
      </div>

      <div className="col-12 md:col-4 lg:col-4">
        <div className="card overview-box gray shadow-2">
          <div className="text-center w-full">
            {poolInfo ? (
              <>
                <Text fontSize="24px" fontWeight={900} textAlign="center">
                  $
                  {getFullDisplayBalance(
                    poolInfo.totalStaked.multipliedBy(dehubPrice),
                    DEHUB_DECIMALS,
                    BUSD_DISPLAY_DECIMALS
                  )}
                </Text>
                <Heading className="pb-1">TVL</Heading>
              </>
            ) : (
              <Skeleton width="100%" height="1.5rem" />
            )}
          </div>
        </div>
      </div>

      <div className="col-12 md:col-4 lg:col-4">
        <div className="card overview-box gray shadow-2">
          <div className="text-center w-full">
            {poolInfo ? (
              <>
                <Text fontSize="24px" fontWeight={900} textAlign="center">
                  {poolInfo.totalStakers}
                </Text>
                <Heading className="pb-1">Stakers</Heading>
              </>
            ) : (
              <Skeleton width="100%" height="1.5rem" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakedInfoBox;
