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
`;

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = ({ children, ...props }: ContainerProps) => {
  return <StyledContainer {...props}>{children}</StyledContainer>;
};

export default Container;
