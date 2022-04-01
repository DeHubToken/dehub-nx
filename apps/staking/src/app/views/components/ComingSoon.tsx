import { Box, Heading, Text } from '@dehub/react/ui';
import { Card } from 'primereact/card';
import { useMemo } from 'react';
import styled from 'styled-components';
import { SimpleCountDown } from '../../components/CountDown';
import { usePools } from '../../state/application/hooks';
import { quarterMark } from '../../utils/pool';

const StyledBox = styled(Box)`
  padding: 1rem;
`;

interface ComingSoonProps {
  poolIndex: number;
}

const ComingSoon = ({ poolIndex }: ComingSoonProps) => {
  const { pools } = usePools();
  const poolInfo = pools[poolIndex];
  const openTimeStamp = useMemo(
    () => (poolInfo ? Number(poolInfo.openTimeStamp) : 0),
    [poolInfo]
  );

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
          <span style={{ fontWeight: 900 }}>
            Coming Soon: {quarterMark(poolInfo)}
          </span>
        </Heading>

        <div className="grid mt-2">
          <div className="col-12 md:col-4 lg:col-4 align-self-start">
            <div className="card overview-box gray shadow-2">
              <div className="overview-info text-left w-full">
                <Heading className="pb-2">Opening in </Heading>
                <SimpleCountDown
                  limitTime={openTimeStamp}
                  className="pb-2"
                  style={{ fontSize: '24px', fontWeight: 900 }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 md:col-8 lg:col-8 align-self-start">
            <div className="card overview-box gray shadow-2">
              <div className="overview-info text-left w-full">
                <Text fontSize="14px" fontWeight={900} className="pb-2">
                  You will be able to stake your DeHub in this vault once it's
                  opened. <br />
                  <br />
                  Don't forget to come back to earn more DeHub and BNB!
                </Text>
              </div>
            </div>
          </div>
        </div>
      </StyledBox>
    </Card>
  );
};

export default ComingSoon;
