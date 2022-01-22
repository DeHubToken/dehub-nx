import { Hooks } from '@dehub/react/core';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { Header, Text } from '../components/Text';
import { useStakingContract } from '../hooks/useContract';

const StakedInfoBox = () => {
  const stakingContract = useStakingContract();
  const { account } = Hooks.useMoralisEthers();
  const [totalStaked, setTotalStaked] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    const fetchInfo = async () => {
      if (account) {
        const pool = await stakingContract?.pool();
        setTotalStaked(pool.totalStaked);
      }
    };

    fetchInfo();
  }, [stakingContract, account]);

  return (
    <>
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Header className="pb-2">Total Staked</Header>
              <br />
              <Text fontSize="14px" fontWeight={900}>
                {totalStaked.toString()}
              </Text>
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Header className="pb-2">Rewards Q1 2022</Header>
              <br />
            </div>
          </div>
        </div>
      </div>

      <div className="grid mt-1 mb-4">
        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full flex flex-column align-items-start">
              <Header className="pb-2">TVL</Header>
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Header className="pb-2">Total Rewards</Header>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakedInfoBox;
