import { useModal } from '@dehub/react/pcsuikit';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import styled from 'styled-components';
import Box from '../../components/Layout/Box';
import { Header, Text } from '../../components/Text';
import { FIRST_LAUNCH_DATE } from '../../config/constants';
import { timeFromNow } from '../../utils/timeFromNow';
import StakeModal from './StakeModal';

const StyledBox = styled(Box)`
  padding: 1rem;
`;

const LiveCard = () => {
  const [onPresentUnStakeModal] = useModal(<StakeModal id="unstake" />, false);
  return (
    <Card className="border-neon-2 overflow-hidden mt-5">
      <StyledBox>
        <>
          <Header
            className="py-2 px-3 inline-flex border-neon-2"
            style={{
              borderRadius: '8px',
              background:
                'linear-gradient(50deg, rgba(89,70,0,1) 0%, rgba(193,160,49,1) 48%, rgba(89,70,0,1) 100%)',
            }}
          >
            <span style={{ fontWeight: 900 }}>Live</span>
          </Header>

          <div className="grid mt-2">
            <div className="col-12 md:col-5 lg:col-5 align-self-start">
              <div className="card overview-box gray shadow-2">
                <div className="overview-info text-left w-full">
                  <Header className="pb-2">Ends In </Header>
                  <Text fontSize="14px" fontWeight={900} className="pb-2">
                    {timeFromNow(FIRST_LAUNCH_DATE)}
                  </Text>
                </div>
              </div>
            </div>
            <div className="col-12 md:col-7 lg:col-7 align-self-start">
              <div className="card overview-box gray shadow-2">
                <div className="overview-info text-left w-full">
                  <Header className="pb-2">Projected Rewards</Header>
                  <Text fontSize="14px" fontWeight={900} className="pb-2">
                    $4452
                  </Text>
                  <Text fontSize="12px" fontWeight={400} className="pb-2">
                    3000 $Dehub
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <div className="grid mt-2">
            <div className="col-12 md:col-12 lg:col-12 align-self-start">
              <div className="card overview-box gray shadow-2">
                <div className="overview-info text-left w-full">
                  <Header className="pb-2">Your Stake</Header>
                  <Text fontSize="14px" fontWeight={900} className="pb-2">
                    20000 $Dehub
                  </Text>
                  <Text fontSize="14px" fontWeight={900} className="pb-2">
                    1.3% of the total pool
                  </Text>
                  <Button
                    className="p-button mt-2 justify-content-center w-5"
                    onClick={onPresentUnStakeModal}
                    label="Unstake"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid mt-2">
            <div className="col-12 md:col-12 lg:col-12 align-self-start">
              <div className="card overview-box gray shadow-2">
                <div className="overview-info text-left w-full">
                  <Header className="pb-2">Weekly BNB Rewards</Header>
                  <Text fontSize="14px" fontWeight={900} className="pb-2">
                    Your BNB Reward: 0.00
                  </Text>
                  <Text fontSize="14px" fontWeight={900} className="pb-2">
                    Total BNB Reward Pool: 0.00
                  </Text>
                  <Button
                    className="p-button mt-2 justify-content-center w-5"
                    onClick={() => {
                      console.log('clicked'); // eslint-disable-line
                    }}
                    label="Claim BNB"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </StyledBox>
    </Card>
  );
};

export default LiveCard;
