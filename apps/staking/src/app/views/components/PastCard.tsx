import { ConnectWalletButton } from '@dehub/react/core';
import { Box, Heading, Text } from '@dehub/react/ui';
import {
  BUSD_DISPLAY_DECIMALS,
  DEHUB_DECIMALS,
  DEHUB_DISPLAY_DECIMALS,
} from '@dehub/shared/config';
import { BIG_ZERO, getFullDisplayBalance } from '@dehub/shared/util';
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/abstract-provider';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { useMoralis } from 'react-moralis';
import styled from 'styled-components';
import { FetchStatus } from '../../config/constants/types';
import { useStakingContract } from '../../hooks/useContract';
import { useStakePaused } from '../../hooks/usePaused';
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
  const { account } = useMoralis();
  const stakingContract = useStakingContract(poolIndex);
  const pools = usePools();
  const poolInfo = pools[poolIndex];
  const paused = useStakePaused(poolIndex);
  const { fetchStatus: fetchStakeStatus, userInfo: userStakeInfo } = useStakes(
    poolIndex,
    account
  );
  const pendingHarvest = usePendingHarvest(poolIndex, account);
  const deHubPriceInBUSD = useDehubBusdPrice();
  const [pendingHarvestTx, setPendingHarvestTx] = useState(false);
  const toast = useRef<Toast>(null);

  const handleHarvest = async () => {
    setPendingHarvestTx(true);

    try {
      const tx: TransactionResponse =
        await stakingContract?.harvestAndWithdraw();
      const receipt: TransactionReceipt = await tx.wait();
      if (receipt.status) {
        toast?.current?.show({
          severity: 'info',
          summary: 'Harvest & unstake',
          detail: 'Harvest & unstake successfully. Please check your wallet.',
          life: 4000,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast?.current?.show({
        severity: 'error',
        summary: 'Harvest & unstake',
        detail: `Harvest & unstake failed - ${
          error?.data?.message ?? error.message
        }`,
        life: 4000,
      });
    } finally {
      setPendingHarvestTx(false);
    }
  };

  return (
    <>
      <Toast ref={toast} />

      <Card className="border-neon-1 overflow-hidden mt-5">
        <StyledBox>
          <Heading
            className="py-2 px-3 inline-flex border-neon-1"
            style={{
              borderRadius: '8px',
              background:
                'linear-gradient(50deg, rgba(46,59,78,1) 0%, rgba(158,198,223,1) 48%, rgba(46,59,78,1) 100%)',
            }}
          >
            <span style={{ fontWeight: 900 }}>{quarterMark(poolInfo)}</span>
          </Heading>

          <div className="grid mt-2">
            <div className="col-12 align-self-start">
              <div className="card overview-box gray shadow-2">
                <div className="overview-info text-left w-full">
                  <Heading className="pb-1">Your Stake</Heading>
                  {account && fetchStakeStatus === FetchStatus.SUCCESS ? (
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
            <div className="col-12 align-self-start">
              <div className="card overview-box gray shadow-2">
                <div className="overview-info text-left w-full">
                  <Heading className="pb-1">Withdrawable Rewards</Heading>
                  {account && pendingHarvest ? (
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
            <div className="col-12 align-self-start">
              {account ? (
                <Button
                  className="p-button mt-2 justify-content-center"
                  label="Harvest & Unstake"
                  disabled={
                    paused ||
                    !userStakeInfo ||
                    userStakeInfo.harvested ||
                    userStakeInfo.amount.eq(BIG_ZERO)
                  }
                  onClick={handleHarvest}
                  loading={pendingHarvestTx}
                  loadingIcon={'pi pi-spin pi-spinner'}
                />
              ) : (
                <ConnectWalletButton />
              )}
            </div>
          </div>
        </StyledBox>
      </Card>
    </>
  );
};

export default PastCard;
