import {
  BUSD_DECIMALS,
  BUSD_DISPLAY_DECIMALS,
  DEHUB_DECIMALS,
} from '@dehub/shared/config';
import {
  ethersToBigNumber,
  getBalanceNumber,
  getDecimalAmount,
  getFullDisplayBalance,
} from '@dehub/shared/utils';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import BigNumber from 'bignumber.js';
import { Header, Text } from '../components/Text';
import { useStakingContract } from '../hooks/useContract';
import {
  useDehubBusdPrice,
  usePoolInfo,
  usePullBusdPrice,
} from '../state/application/hooks';

const StakedInfoBox = () => {
  usePullBusdPrice();
  const stakingContract = useStakingContract();
  const dehubPrice = useDehubBusdPrice();
  const poolInfo = usePoolInfo();

  return poolInfo ? (
    <>
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Header className="pb-2">Total Staked</Header>
              <br />
              <Text fontSize="14px" fontWeight={900}>
                {getBalanceNumber(
                  ethersToBigNumber(poolInfo?.totalStaked),
                  DEHUB_DECIMALS
                )}{' '}
                $Dehub
              </Text>
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Header className="pb-2">Rewards Q1 2022</Header>
              <br />
              {getBalanceNumber(
                ethersToBigNumber(poolInfo?.harvestFund as EthersBigNumber),
                DEHUB_DECIMALS
              )}{' '}
              $Dehub
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
              <Text fontSize="14px" fontWeight={900}>
                $
                {getFullDisplayBalance(
                  dehubPrice.times(
                    getDecimalAmount(
                      new BigNumber(
                        getBalanceNumber(
                          ethersToBigNumber(
                            poolInfo?.totalStaked as EthersBigNumber
                          ),
                          DEHUB_DECIMALS
                        )
                      ),
                      DEHUB_DECIMALS
                    )
                  ),
                  BUSD_DECIMALS,
                  BUSD_DISPLAY_DECIMALS
                )}
              </Text>
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Header className="pb-2">Total Rewards</Header>
              <br />
              {getBalanceNumber(
                ethersToBigNumber(poolInfo?.harvestFund as EthersBigNumber),
                DEHUB_DECIMALS
              )}{' '}
              $Dehub
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Text>loading</Text>
  );
};

export default StakedInfoBox;
