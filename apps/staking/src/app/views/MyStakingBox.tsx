import { ConnectWalletButton, useWeb3Context } from '@dehub/react/core';
import { Box, Heading, Text } from '@dehub/react/ui';
import { DEHUB_DECIMALS, DEHUB_DISPLAY_DECIMALS } from '@dehub/shared/model';
import {
  BIG_ZERO,
  ethersToBigNumber,
  getFullDisplayBalance,
} from '@dehub/shared/utils';
import { Interface } from '@ethersproject/abi';
import { ContractReceipt, Event } from '@ethersproject/contracts';
import { id } from '@ethersproject/hash';
import BigNumber from 'bignumber.js';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { useMemo, useRef, useState } from 'react';
import { usePickStakingContract } from '../hooks/useContract';
import { useFetchPool, usePool, useUserInfo } from '../state/application/hooks';
import { calculateGasMargin } from '../utils/tx';
import { /* RestakeModal, */ StakeModal, UnstakeModal } from './components';

const MyStakingBox = () => {
  const { account } = useWeb3Context();
  const stakingContract = usePickStakingContract();
  const { poolInfo } = usePool();
  const { userInfo } = useUserInfo();

  const { updatePool, updateUser } = useFetchPool();
  const [openStakeModal, setOpenStakeModal] = useState<boolean>(false);
  const [openUnstakeModal, setOpenUnstakeModal] = useState<boolean>(false);
  // const [openRestakeModal, setOpenRestakeModal] = useState<boolean>(false);
  const [isTxPending, setIsTxPending] = useState(false);

  const toast = useRef<Toast>(null);

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
    } /* else if (modal === 'restake') {
      setOpenRestakeModal(showOrHide);
    } */
  };

  const handleClaim = async () => {
    if (!stakingContract) return;

    try {
      const ClaimedTopic = id('Claimed(address,uint256)');
      const ClaimedInterface = new Interface([
        'event Claimed(address indexed user, uint256 amount)',
      ]);

      setIsTxPending(true);
      const estimateGas = await stakingContract.estimateGas['claim']();
      const tx = await stakingContract['claim']({
        from: account,
        gasLimit: calculateGasMargin(estimateGas),
      });
      await tx.wait().then((receipt: ContractReceipt) => {
        updatePool();
        updateUser();

        const events = receipt.events?.filter(
          (event: Event) => event.topics[0] === ClaimedTopic
        );
        const lastEvent =
          events && events.length > 0 ? events.slice(-1)[0] : undefined;
        if (!lastEvent) return;

        const parsed = ClaimedInterface.parseLog(lastEvent);

        toast?.current?.show({
          severity: 'success',
          summary: `Success`,
          detail: (
            <Box>
              <Text style={{ marginBottom: '8px' }}>
                {`${getFullDisplayBalance(
                  ethersToBigNumber(parsed.args['amount']),
                  DEHUB_DECIMALS,
                  DEHUB_DISPLAY_DECIMALS
                )} $DHB has been successfully claimed!`}
              </Text>
            </Box>
          ),
          life: 4000,
        });
      });
    } catch (error) {
      let errMsg;
      if (error instanceof Error && error.message) {
        errMsg = error.message;
      } else if ((error as { data: { message: string } }).data.message) {
        errMsg = (error as { data: { message: string } }).data.message;
      } else {
        console.error(error);
        throw new Error('unknown error during handling claim');
      }
      toast?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: `Staking failed - ${errMsg}`,
        life: 4000,
      });
    }
    setIsTxPending(false);
  };

  return (
    <>
      <Toast ref={toast} />
      <Card className="border-neon-1 overflow-hidden">
        <Box style={{ padding: '1rem' }}>
          <div className="grid">
            <div className="col-12 md:col-4 lg:col-4 flex flex-column">
              <Heading className="pb-1 text-left ml-4">Total Staked</Heading>
              <div className="card overview-box gray shadow-2 mt-1">
                <div className="overview-info text-left w-full">
                  {isReady && userInfo ? (
                    <>
                      <Text fontSize="16px" fontWeight={900}>
                        {getFullDisplayBalance(
                          userInfo.totalAmount,
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
                  {isReady && userInfo ? (
                    <>
                      <Text fontSize="16px" fontWeight={900}>
                        {getFullDisplayBalance(
                          new BigNumber(userInfo.stakingShares),
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
              <Heading className="pb-1 text-left ml-4">
                {!userInfo || userInfo.totalAmount > BigNumber(0) ? `Current Tier`: `Last Tier`}
              </Heading>
              <div className="card overview-box gray shadow-2 mt-1">
                <div className="overview-info text-left w-full flex flex-column align-items-start">
                  {isReady && userInfo && poolInfo ? (
                    <>
                      <Text fontSize="16px" fontWeight={900}>
                        Tier {userInfo.lastTierIndex + 1}
                      </Text>
                      <Text className="mt-2">
                        {poolInfo.tierPercents[userInfo.lastTierIndex] / 100}%
                        share of total rewards
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
                  {isReady && userInfo && userInfo.totalAmount > BigNumber(0) ? (
                    <>
                      <Text fontSize="16px" fontWeight={900}>
                        {userInfo.stakedAt > 0
                          ? new Date(userInfo.stakedAt * 1000).toLocaleString()
                          : new Date().toLocaleString()}
                        {` - `}
                      </Text>
                      <Text
                        fontSize="16px"
                        fontWeight={900}
                        className="mt-2 ml-2"
                      >
                        {userInfo.unlockedAt > 0
                          ? new Date(
                              userInfo.unlockedAt * 1000
                            ).toLocaleString()
                          : new Date().toLocaleString()}
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

            <div className="col-12 md:col-4 lg:col-4 flex flex-column">
              <Heading className="pb-1 text-left ml-4">Total Unlocked</Heading>
              <div className="card overview-box gray shadow-2 mt-1">
                <div className="overview-info text-left w-full">
                  {isReady && userInfo ? (
                    <>
                      <Text fontSize="16px" fontWeight={900}>
                        {getFullDisplayBalance(
                          now.getTime() > userInfo.unlockedAt * 1000
                            ? userInfo.totalAmount
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
                  {isReady && userInfo ? (
                    <>
                      <Text fontSize="16px" fontWeight={900}>
                        {getFullDisplayBalance(
                          userInfo.pendingHarvest,
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
                <div className="flex flex-wrap">
                  <Button
                    className="p-button mt-2 justify-content-center mr-3"
                    onClick={() => handleModal('stake', true)}
                    disabled={!isReady || isTxPending}
                    label="Stake"
                  />
                  <Button
                    className="p-button-outlined mt-2 mr-3 justify-content-center text-white border-primary"
                    onClick={() => handleModal('unstake', true)}
                    disabled={
                      !isReady ||
                      (userInfo && userInfo.totalAmount.eq(BIG_ZERO)) ||
                      isTxPending
                    }
                    label="Unstake"
                  />
                  {/* <Button
                    className="p-button mt-2 justify-content-center mr-3 text-white border-primary"
                    onClick={() => handleModal('restake', true)}
                    disabled={
                      !isReady ||
                      (userInfo && userInfo.totalAmount.eq(BIG_ZERO)) ||
                      isTxPending
                    }
                    label="Restake"
                  /> */}
                  <Button
                    className="p-button-outlined mt-2 justify-content-center text-white border-primary"
                    onClick={() => handleClaim()}
                    disabled={
                      !isReady ||
                      (userInfo && userInfo.pendingHarvest.eq(BIG_ZERO))
                    }
                    loading={isTxPending}
                    label="Claim"
                  />
                </div>
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
      {/* <RestakeModal
        open={openRestakeModal}
        onHide={() => handleModal('restake', false)}
      /> */}
    </>
  );
};

export default MyStakingBox;
