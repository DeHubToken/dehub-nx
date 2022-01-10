import { Card } from 'primereact/card';
import styled from 'styled-components';
import Box from '../../components/Layout/Box';
import { Header, Text } from '../../components/Text';

const StyledBox = styled(Box)`
  padding: 1rem;
`;

const ComingSoon = () => {
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
            <span style={{ fontWeight: 900 }}>Coming Soon</span>
          </Header>

          <div className="grid mt-2">
            <div className="col-12 md:col-4 lg:col-4 align-self-start">
              <div className="card overview-box gray shadow-2">
                <div className="overview-info text-left w-full">
                  <Header className="pb-2">Opening in </Header>
                  <Text fontSize="14px" fontWeight={900} className="pb-2">
                    XXX
                  </Text>
                </div>
              </div>
            </div>
            <div className="col-12 md:col-8 lg:col-8 align-self-start">
              <div className="card overview-box gray shadow-2">
                <div className="overview-info text-left w-full">
                  <Text fontSize="14px" fontWeight={900} className="pb-2">
                    You will have 10 days to stake your DeHub in this vault once
                    it's oppened. <br />
                    <br />
                    Don't forget to come back to earn more DeHub and BNB!
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </>
      </StyledBox>
    </Card>
  );
};

export default ComingSoon;
