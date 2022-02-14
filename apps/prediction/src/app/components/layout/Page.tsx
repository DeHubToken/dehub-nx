import { PageMeta } from '@dehub/react/ui';
import React from 'react';
import styled from 'styled-components';
import { environment } from '../../../environments/environment';
import Container from './Container';

const { baseUrl } = environment;

const StyledPage = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`;

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <>
      <PageMeta baseUrl={baseUrl} title={'DeHub Prediction'} />
      <StyledPage {...props}>{children}</StyledPage>
    </>
  );
};

export default Page;
