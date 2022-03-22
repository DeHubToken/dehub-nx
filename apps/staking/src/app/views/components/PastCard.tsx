import { Box, Heading, Text } from '@dehub/react/ui';
import {
  BUSD_DISPLAY_DECIMALS,
  DEHUB_DECIMALS,
  DEHUB_DISPLAY_DECIMALS,
} from '@dehub/shared/config';
import { getFullDisplayBalance } from '@dehub/shared/util';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { useMoralis } from 'react-moralis';
import styled from 'styled-components';
import { FetchStatus } from '../../config/constants/types';
import { usePendingHarvest, useStakes } from '../../hooks/useStakes';
import { useDehubBusdPrice, usePools } from '../../state/application/hooks';
import { quarterMark } from '../../utils/pool';

const StyledBox = styled(Box)`
  padding: 1rem;
`;

interface CardProps {
  poolIndex: number;
}

const PastCard = ({ poolIndex }: CardProps) => {
  const pools = usePools();
  const poolInfo = pools[poolIndex];

  const { account } = useMoralis();
  const { fetchStatus: fetchStakeStatus, userInfo: userStakeInfo } = useStakes(
    poolIndex,
    account
  );
  const pendingHarvest = usePendingHarvest(poolIndex, account);
  const deHubPriceInBUSD = useDehubBusdPrice();

  return (
    <Card className="border-neon-2 overflow-hidden mt-5">
      <StyledBox>
        <Heading
          className="py-2 px-3 inline-flex border-neon-2"
          style={{
            borderRadius: '8px',
            background:
              'linear-gradient(50deg, rgba(89,70,0,1) 0%, rgba(193,160,49,1) 48%, rgba(89,70,0,1) 100%)',
          }}
        >
          <span style={{ fontWeight: 900 }}>{quarterMark(poolInfo)}</span>
        </Heading>

        <div className="grid mt-2">
          <div className="col-12 md:col-6 lg:col-6 align-self-start">
            <div className="card overview-box gray shadow-2">
              <div className="overview-info text-left w-full">
                <Heading className="pb-1">Your Stake</Heading>
                {fetchStakeStatus === FetchStatus.SUCCESS ? (
                  <>
                    <Text fontSize="24px" fontWeight={900}>
                      {getFullDisplayBalance(
                        userStakeInfo.amount,
                        DEHUB_DECIMALS
                      )}
                    </Text>
                    <Text>
                      $
                      {getFullDisplayBalance(
                        userStakeInfo.amount.times(deHubPriceInBUSD),
                        DEHUB_DECIMALS,
                        BUSD_DISPLAY_DECIMALS
                      )}
                    </Text>
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
          <div className="col-12 md:col-6 lg:col-6 align-self-start">
            <div className="card overview-box gray shadow-2">
              <div className="overview-info text-left w-full">
                <Heading className="pb-1">Rewards</Heading>
                {pendingHarvest ? (
                  <>
                    <Text fontSize="24px" fontWeight={900}>
                      {getFullDisplayBalance(
                        pendingHarvest,
                        DEHUB_DECIMALS,
                        DEHUB_DISPLAY_DECIMALS
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
      </StyledBox>
    </Card>
  );
};

export default PastCard;
