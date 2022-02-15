import { Box, Container, Heading } from '@dehub/react/ui';
import { Card } from 'primereact/card';
import styled from 'styled-components';
import StakedInfoBox from './StakedInfoBox';

const StyledBox = styled(Box)`
  padding: 1rem;
`;

const StakedTopInfoBox = () => {
  return (
    <Container>
      <Card className="border-neon-1 overflow-hidden mt-5">
        <StyledBox>
          <Heading
            className="py-2 px-3 inline-flex mb-5"
            fontWeight={900}
            fontSize={'34px'}
          >
            Staking Info
          </Heading>
          <StakedInfoBox />
        </StyledBox>
      </Card>
    </Container>
  );
};

export default StakedTopInfoBox;
