import { Box, Heading, Text } from '@dehub/react/ui';
import moment from 'moment';
import { Card } from 'primereact/card';
import styled from 'styled-components';
import { usePools } from '../../state/application/hooks';
import { timeFromNow } from '../../utils/timeFromNow';

const StyledBox = styled(Box)`
  padding: 1rem;
`;

interface ComingSoonProps {
  poolIndex: number;
}

const ComingSoon = ({ poolIndex }: ComingSoonProps) => {
  const nextQ = `Q${moment().add(3, 'months').quarter()} ${moment()
    .add(3, 'months')
    .year()}`;
  const currentQ = `Q${moment().quarter()} ${moment().year()}`;
  const isIn2022Q1 = moment().quarter() === 1 && moment().year() === 2022;

  const pools = usePools();
  const poolInfo = pools[poolIndex];
  const openTimeStamp = poolInfo ? Number(poolInfo.openTimeStamp) * 1000 : '0';

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
            Coming Soon: {isIn2022Q1 ? currentQ : nextQ}
          </span>
        </Heading>

        <div className="grid mt-2">
          <div className="col-12 md:col-4 lg:col-4 align-self-start">
            <div className="card overview-box gray shadow-2">
              <div className="overview-info text-left w-full">
                <Heading className="pb-2">Opening in </Heading>
                <Text fontSize="14px" fontWeight={900} className="pb-2">
                  {timeFromNow(moment(new Date(openTimeStamp)))}
                </Text>
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
