import { ConnectWalletButton, useWeb3Context } from '@dehub/react/core';
import { Box, Heading, Text } from '@dehub/react/ui';
import { DEHUB_DECIMALS, DEHUB_DISPLAY_DECIMALS } from '@dehub/shared/config';
import { BIG_ZERO, getFullDisplayBalance } from '@dehub/shared/utils';
import BigNumber from 'bignumber.js';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { useMemo, useState } from 'react';
import { usePool, useUserInfo } from '../state/application/hooks';
import { RestakeModal, StakeModal, UnstakeModal } from './components';

const MyStakingBox = () => {
  const { account } = useWeb3Context();

  const [openStakeModal, setOpenStakeModal] = useState<boolean>(false);
  const [openUnstakeModal, setOpenUnstakeModal] = useState<boolean>(false);
  const [openRestakeModal, setOpenRestakeModal] = useState<boolean>(false);
  const { poolInfo } = usePool();
  const { userInfo } = useUserInfo();
  const now = new Date();

  const isReady = useMemo(
    () => poolInfo && userInfo && account,
    [poolInfo, userInfo, account]
  );

  const handleModal = (modal: string, showOrHide: boolean) => {
    if (modal === 'stake') {
      setOpenStakeModal(showOrHide);
    } else if (modal === 'unstake') {
      setOpenUnstakeModal(showOrHide);
    } else if (modal === 'restake') {
      setOpenRestakeModal(showOrHide);
    }
  };

  return (
    <>
      <Card className="border-neon-1 overflow-hidden">
        <Box style={{ padding: '1rem' }}>
          <div className="grid">
            <div className="col-12 md:col-4 lg:col-4 flex flex-column">
              <Heading className="pb-1 text-left ml-4">Total Staked</Heading>
              <div className="card overview-box gray shadow-2 mt-1">
                <div className="overview-info text-left w-full">
                  {isReady ? (
                    <>
                      <Text fontSize="16px" fontWeight={900}>
                        {getFullDisplayBalance(
                          userInfo!.totalAmount,
                          DEHUB_DECIMALS
                        )}
                      </Text>
                      <Text className="mt-2">$DHB</Text>
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

            <div className="col-12 md:col-4 lg:col-4 flex flex-column">
              <Heading className="pb-1 text-left ml-4">Staking Shares</Heading>
              <div className="card overview-box gray shadow-2 mt-1">
                <div className="overview-info text-left w-full">
                  {isReady ? (
                    <>
                      <Text fontSize="16px" fontWeight={900}>
                        {getFullDisplayBalance(
                          new BigNumber(userInfo!.stakingShares),
                          0,
                          DEHUB_DISPLAY_DECIMALS
                        )}
                        %
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

            <div className="col-12 md:col-4 lg:col-4 flex flex-column">
              <Heading className="pb-1 text-left ml-4">Current Tier</Heading>
              <div className="card overview-box gray shadow-2 mt-1">
                <div className="overview-info text-left w-full flex flex-column align-items-start">
                  {isReady ? (
                    <>
                      <Text fontSize="16px" fontWeight={900}>
                        Tier {userInfo!.lastTierIndex + 1}
                      </Text>
                      <Text className="mt-2">
                        {poolInfo!.tierPercents[userInfo!.lastTierIndex]}% share
                        of total rewards
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
          <div className="grid mt-2">
            <div className="col-12 md:col-4 lg:col-4 flex flex-column">
              <Heading className="pb-1 text-left ml-4">Unlock date</Heading>
              <div className="card overview-box gray shadow-2 mt-1">
                <div className="overview-info text-left w-full flex flex-column align-items-start">
                  {isReady ? (
                    <>
                      <Text fontSize="16px" fontWeight={900}>
                        {userInfo!.unlockedAt > 0
                          ? new Date(
                              userInfo!.unlockedAt * 1000
                            ).toLocaleString()
                          : new Date().toLocaleString()}
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

            <div className="col-12 md:col-4 lg:col-4 flex flex-column">
              <Heading className="pb-1 text-left ml-4">Total Unlocked</Heading>
              <div className="card overview-box gray shadow-2 mt-1">
                <div className="overview-info text-left w-full">
                  {isReady ? (
                    <>
                      <Text fontSize="16px" fontWeight={900}>
                        {getFullDisplayBalance(
                          now.getTime() > userInfo!.unlockedAt * 1000
                            ? userInfo!.totalAmount
                            : BIG_ZERO,
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

            <div className="col-12 md:col-4 lg:col-4 flex flex-column">
              <Heading className="pb-1 text-left ml-4">Pending Reward</Heading>
              <div className="card overview-box gray shadow-2 mt-1">
                <div className="overview-info text-left w-full">
                  {isReady ? (
                    <>
                      <Text fontSize="16px" fontWeight={900}>
                        {getFullDisplayBalance(
                          userInfo!.pendingHarvest,
                          DEHUB_DECIMALS
                        )}
                      </Text>

                      <Text className="mt-2">$DHB</Text>
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
          <div className="grid mt-2">
            <div className="col-12 md:col-12 lg:col-12 align-self-start">
              {!account ? (
                <ConnectWalletButton />
              ) : (
                <>
                  <Button
                    className="p-button mt-2 justify-content-center w-2 mr-3"
                    onClick={() => handleModal('stake', true)}
                    disabled={!isReady}
                    label="Stake"
                  />
                  <Button
                    className="p-button-outlined mt-2 mr-3 justify-content-center w-2 text-white border-primary"
                    onClick={() => handleModal('unstake', true)}
                    disabled={!isReady || userInfo!.totalAmount.eq(BIG_ZERO)}
                    label="Unstake"
                  />
                  <Button
                    className="p-button mt-2 justify-content-center w-2 text-white border-primary"
                    onClick={() => handleModal('restake', true)}
                    disabled={!isReady || userInfo!.totalAmount.eq(BIG_ZERO)}
                    label="Restake"
                  />
                </>
              )}
            </div>
          </div>
        </Box>
      </Card>
      <StakeModal
        open={openStakeModal}
        onHide={() => handleModal('stake', false)}
      />
      <UnstakeModal
        open={openUnstakeModal}
        onHide={() => handleModal('unstake', false)}
      />
      <RestakeModal
        open={openRestakeModal}
        onHide={() => handleModal('restake', false)}
      />
    </>
  );
};

export default MyStakingBox;
