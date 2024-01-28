import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  margin: auto;

  @media screen and (min-width: 576px) {
    max-width: 520px;
  }
  @media screen and (min-width: 768px) {
    max-width: 756px;
  }
  @media screen and (min-width: 992px) {
    max-width: 960px;
  }
`;

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return <StyledContainer {...props}>{children}</StyledContainer>;
};

export default Container;
