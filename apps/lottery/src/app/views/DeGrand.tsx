import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from 'primereact/card';

import Box from '../components/Layout/Box';
import Container from '../components/Layout/Container';

const StyledBox = styled(Box)`
  padding: 1rem;
`

const DeGrand = () => {
  return (
    <Container>
      <StyledBox>
        <h1>DeGrand</h1>
        <Card>
          <h1 className="text-center">2d 2h 26m until the draw</h1>
        </Card>
      </StyledBox>
    </Container>
  );
}

export default DeGrand;