import { Card } from 'primereact/card';
import styled from 'styled-components';
import Box from '../components/Layout/Box';
import Container from '../components/Layout/Container';
import { Header } from '../components/Text';
import StakedInfoBox from './StakedInfoBox';

const StyledContainer = styled(Container)`
  .p-tabview .p-tabview-nav li {
    width: 50%;
  }
`;

const StyledBox = styled(Box)`
  padding: 1rem;
`;

const StakedTopInfoBox = () => {
  return (
    <Container>
      <Card className="border-neon-1 overflow-hidden mt-5">
        <StyledBox>
          <Header
            className="py-2 px-3 inline-flex mb-5"
            fontWeight={900}
            fontSize={'34px'}
          >
            Staking Info
          </Header>
          <StakedInfoBox />
        </StyledBox>
      </Card>
    </Container>
  );
};

export default StakedTopInfoBox;
