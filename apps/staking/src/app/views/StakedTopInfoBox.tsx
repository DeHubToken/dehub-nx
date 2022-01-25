import styled from 'styled-components';
import Box from '../components/Layout/Box';
import Container from '../components/Layout/Container';
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
    <StyledContainer>
      <StyledBox>
        <StakedInfoBox />
      </StyledBox>
    </StyledContainer>
  );
};

export default StakedTopInfoBox;
