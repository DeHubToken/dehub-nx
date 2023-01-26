import { Box, Heading, Text } from '@dehub/react/ui';
import { DEHUB_DECIMALS } from '@dehub/shared/config';
import { getFullDisplayBalance } from '@dehub/shared/utils';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { usePool, useUserInfo } from '../state/application/hooks';

const MyStakingBox = () => {
  const { poolInfo } = usePool();
  const { userInfo } = useUserInfo();
  const now = new Date();

  return (
    <Card className="border-neon-1 overflow-hidden">
      <Box style={{ padding: '1rem' }}>
        <div className="grid">
          <div className="col-12 md:col-4 lg:col-4">
            <div className="card overview-box gray shadow-2">
              <div className="overview-info text-left w-full">
                <Heading className="pb-1">Total Staked</Heading>
                {userInfo ? (
                  <>
                    <Text fontSize="24px" fontWeight={900}>
                      {getFullDisplayBalance(
                        userInfo.totalAmount,
                        DEHUB_DECIMALS
                      )}
                    </Text>
                    <Text>$DHB</Text>
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

          <div className="col-12 md:col-4 lg:col-4">
            <div className="card overview-box gray shadow-2">
              <div className="overview-info text-left w-full">
                <Heading className="pb-1">Staking Shares</Heading>
                {userInfo ? (
                  <>
                    <Text fontSize="24px" fontWeight={900}>
                      {userInfo.stakingShares.toString()}%
                    </Text>
                    <Text></Text>
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

          <div className="col-12 md:col-4 lg:col-4">
            <div className="card overview-box gray shadow-2">
              <div className="overview-info text-left w-full flex flex-column align-items-start">
                <Heading className="pb-1">Current Tier</Heading>
                {userInfo && poolInfo ? (
                  <>
                    <Text fontSize="24px" fontWeight={900}>
                      Tier {userInfo.lastTierIndex + 1}
                    </Text>
                    <Text>
                      {poolInfo.tierPercents[userInfo.lastTierIndex]}% share of
                      total rewards
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
        </div>
        <div className="grid mt-1">
          <div className="col-12 md:col-4 lg:col-4">
            <div className="card overview-box gray shadow-2">
              <div className="overview-info text-left w-full flex flex-column align-items-start">
                <Heading className="pb-1">Unlock date</Heading>
                {userInfo ? (
                  <>
                    <Text fontSize="24px" fontWeight={900}>
                      {new Date(userInfo.unlockedAt * 1000).toString()}
                    </Text>
                    <Text></Text>
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

          <div className="col-12 md:col-4 lg:col-4">
            <div className="card overview-box gray shadow-2">
              <div className="overview-info text-left w-full">
                <Heading className="pb-1">Total Unlocked</Heading>
                {userInfo ? (
                  <>
                    <Text fontSize="24px" fontWeight={900}>
                      {now.getTime() > userInfo.unlockedAt * 1000
                        ? getFullDisplayBalance(
                            userInfo.totalAmount,
                            DEHUB_DECIMALS
                          )
                        : '---'}
                    </Text>
                    <Text></Text>
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

          <div className="col-12 md:col-4 lg:col-4">
            <div className="card overview-box gray shadow-2">
              <div className="overview-info text-left w-full">
                <Heading className="pb-1">Pending Reward</Heading>
                {userInfo ? (
                  <>
                    <Text fontSize="24px" fontWeight={900}>
                      {getFullDisplayBalance(
                        userInfo.pendingHarvest,
                        DEHUB_DECIMALS
                      )}
                    </Text>
                    <Text></Text>
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
      </Box>
    </Card>
  );
};

export default MyStakingBox;
