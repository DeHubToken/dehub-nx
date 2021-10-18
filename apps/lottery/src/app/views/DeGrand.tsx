import React, { useEffect, useState } from 'react';
import { endOfMonth } from 'date-fns';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import { Hooks } from '@dehub/react/core';

import FlexLine from './components/FlexLine';
import Box from '../components/Layout/Box';
import ConnectWalletButton from '../components/ConnectWalletButton';
import Container from '../components/Layout/Container';
import { Title, Header, Text } from '../components/Text';
import { useLottery, useDeGrandPrize } from '../states/special-lottery/hooks';

const StyledBox = styled(Box)`
  padding: 1rem;
`;

const DeGrand = () => {
  const { currentLotteryId } = useLottery();
  const deGrandPrize = useDeGrandPrize(currentLotteryId);

  const { account } = Hooks.useMoralisEthers();
  const [checkDeGrandDialog, setCheckDeGrandDialog] = useState(false);

  const endOfMonthAsInt = endOfMonth(new Date()).getTime(); // end of month with 23:59:59

  const handleShowDialog = (dialogKind: string) => {
    if (dialogKind === 'CheckDeGrand') {
      setCheckDeGrandDialog(true);
    }
  };
  const handleHideDialog = (dialogKind: string) => {
    if (dialogKind === 'CheckDeGrand') {
      setCheckDeGrandDialog(false);
    }
  };

  return (
    <Container>
      <h1>DeGrand</h1>
      <Card>
        <StyledBox>
          {deGrandPrize ? (
            <FlexLine
              className="align-items-center justify-content-center"
              style={{ borderBottom: '1px solid' }}
            >
              <Header>DeGrand prize this month:</Header>
              {deGrandPrize.imageUrl && (
                <img
                  src={deGrandPrize.imageUrl}
                  style={{ width: '100%', height: '100%' }}
                />
              )}
              <FlexLine className="justify-content-between">
                <FlexLine className="md:flex-column">
                  <Header>{deGrandPrize.title}</Header>
                  <Text>23h 26m until the draw</Text>
                </FlexLine>
                <FlexLine className="md:flex-column">
                  <Text>Are you a winner?</Text>
                  <Button
                    className="p-button-link p-0"
                    onClick={() => handleShowDialog('Check Now')}
                    label="Check Now"
                  />
                </FlexLine>
              </FlexLine>
            </FlexLine>
          ) : (
            <FlexLine
              className="align-items-center justify-content-center py-2"
              style={{ borderBottom: '1px solid' }}
            >
              <Title>Prizes will be anounced soon!</Title>
            </FlexLine>
          )}
          <FlexLine className="md:flex-column align-items-center justify-content-between">
            <Header className="mt-2">Grand history</Header>
            <Text className="my-2">See previous DeGrand Draws</Text>
            {account ? (
              <Button
                className="mt-2 justify-content-center"
                onClick={() => handleShowDialog('CheckDeGrand')}
                label="Check Now"
              />
            ) : (
              <ConnectWalletButton />
            )}
          </FlexLine>
        </StyledBox>
      </Card>
    </Container>
  );
};

export default DeGrand;
