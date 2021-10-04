import { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import {
  TabView,
  TabPanel
} from 'primereact/tabview';

import Box from '../components/Layout/Box';
import Container from '../components/Layout/Container';
import {
  Header,
  Text
} from '../components/Text';
import BuyStandardTicketDialog from './components/BuyStandardTicketDialog';
import BuySpecialTicketDialog from './components/BuySpecialTicketDialog';
import ClaimStage1Dialog from './components/ClaimStage1Dialog';
import ClaimStage2Dialog from './components/ClaimStage2Dialog';
import ListTicketDialog from './components/ListTicketDialog';
import FlexLine from './components/FlexLine';
import WinningNumbers from './components/WiningNumbers';

const StyledContainer = styled(Container)`
  .p-tabview .p-tabview-nav li {
    width: 50%;
  }
`

const StyledBox = styled(Box)`
  padding: 1rem;
`

const winningNumbers: number[] = [
  5, 16, 9, 12
];

const DeLotto = () => {
  const [listTicketDialog, setListTicketDialog] = useState(false);
  const [buyStandardTicketDialog, setBuyStandardTicketDialog] = useState(false);
  const [buySpecialTicketDialog, setBuySpecialTicketDialog] = useState(false);
  const [checkStage1Dialog, setCheckStage1Dialog] = useState(false);
  const [checkStage2Dialog, setCheckStage2Dialog] = useState(false);

  const handleShowListTicketDialog = () => {
    setListTicketDialog(true);
  }

  const handleHideListTicketDialog = () => {
    setListTicketDialog(false);
  }

  const handleShowBuyStandardTicketDialog = () => {
    setBuyStandardTicketDialog(true);
  }

  const handleHideBuyStandardTicketDialog = () => {
    setBuyStandardTicketDialog(false);
  }

  const handleShowBuySpecialTicketDialog = () => {
    setBuySpecialTicketDialog(true);
  }

  const handleHideBuySpecialTicketDialog = () => {
    setBuySpecialTicketDialog(false);
  }

  const handleShowCheckStage1Dialog = () => {
    setCheckStage1Dialog(true);
  }

  const handleHideCheckStage1Dialog = () => {
    setCheckStage1Dialog(false);
  }

  const handleShowCheckStage2Dialog = () => {
    setCheckStage2Dialog(true);
  }

  const handleHideCheckStage2Dialog = () => {
    setCheckStage2Dialog(false);
  }

  const handleBuyStandardTicket = (input: number) => {
    console.log('Buy tickets: ', input);
  }

  const handleInputChange = (input: string) => {
    console.log('Balance input=', input);
  }

  const handleClaimStage1 = (ticketIds: number[]) => {
    console.log('Claim stage1');
  }

  const handleClaimStage2 = () => {
    console.log('Claim stage2');
  }

  return (
    <StyledContainer>
      <h1>DeLotto</h1>
      <TabView>
        <TabPanel header="STAGE #1">
          <StyledBox>
            <h1 className="text-center">
            2h 26m until the draw
            </h1>

            <FlexLine className="align-items-center">
              <Header>Next Draw:</Header>
              <Text>#166 | Draw: Sep 23, 2021, 3:00 PM</Text>
            </FlexLine>

            <FlexLine className="align-items-center">
              <Header>Prize Pot:</Header>
              <Text>300,000,000 $DeHub</Text>
            </FlexLine>

            <FlexLine className="align-items-center md:align-items-start">
              <Header>Your Tickets:</Header>
              <div className="flex flex-column align-items-center md:align-items-end">
                <Text>You have <span className="font-bold">10</span> tickets this round.</Text>
                <Button className="p-button-link p-0" onClick={handleShowListTicketDialog}>
                  View your tickets
                </Button>
                <Button className="button-link mt-3" onClick={handleShowBuyStandardTicketDialog}>
                  Buy Tickets
                </Button>
              </div>
            </FlexLine>

            <FlexLine className="align-items-center md:align-items-start">
              <Header>Latest Winning Number:</Header>
              <div className="flex flex-column align-items-center md:align-items-end">
                <WinningNumbers
                  numbers={winningNumbers}
                  rounded={true}
                />
                <Text>Round #165</Text>
                <Text>Drawn Sep 23, 2021, 3:00 AM</Text>
              </div>
            </FlexLine>

            <FlexLine className="md:flex-column align-items-center">
              <div className="flex flex-column">
                <Text>Are you a winner?</Text>
                <Button className="mt-2 justify-content-center" onClick={handleShowCheckStage1Dialog}>Check Now</Button>
              </div>
            </FlexLine>
          </StyledBox>
        </TabPanel>

        <TabPanel header="STAGE #2">
          <StyledBox>
            <h1 className="text-center">
            1d 2h 26m until the draw
            </h1>

            <FlexLine className="align-items-center">
              <Header>Next Draw:</Header>
              <Text>#166 | Draw: Sep 23, 2021, 3:00 PM</Text>
            </FlexLine>

            <FlexLine className="align-items-center">
              <Header>Prize Pot:</Header>
              <Text>300,000,000 $DeHub</Text>
            </FlexLine>

            <FlexLine className="align-items-center md:align-items-start">
              <Header>Your Tickets:</Header>
              <div className="flex flex-column align-items-center md:align-items-end">
                <Text>You have <span className="font-bold">10</span> tickets this round.</Text>
                <Button className="p-button-link p-0" onClick={handleShowListTicketDialog}>
                  View your tickets
                </Button>
                <Button className="button-link mt-3" onClick={handleShowBuySpecialTicketDialog}>
                  Buy Special Tickets
                </Button>
              </div>
            </FlexLine>

            <div className="flex flex-row justify-content-center">
              <div className="flex flex-column">
                <Text>Are you a winner?</Text>
                <Button className="mt-2 justify-content-center" onClick={handleShowCheckStage1Dialog}>
                  Check Now
                </Button>
              </div>
              <div className="flex flex-column ml-3">
                <Text>Are you a winner stage2?</Text>
                <Button className="mt-2 justify-content-center" onClick={handleShowCheckStage2Dialog}>
                  Check Now
                </Button>
              </div>
            </div>
          </StyledBox>
        </TabPanel>
      </TabView>

      <ListTicketDialog
        open={listTicketDialog}
        onHide={handleHideListTicketDialog}
        onBuy={handleShowBuyStandardTicketDialog}
      />

      <BuyStandardTicketDialog
        open={buyStandardTicketDialog}
        onHide={handleHideBuyStandardTicketDialog}
        onBuy={handleBuyStandardTicket}
      />

      <BuySpecialTicketDialog
        open={buySpecialTicketDialog}
        onHide={handleHideBuySpecialTicketDialog}
        onUserInput={handleInputChange}
      />

      <ClaimStage1Dialog
        open={checkStage1Dialog}
        onHide={handleHideCheckStage1Dialog}
        onClaim={handleClaimStage1}
      />

      <ClaimStage2Dialog
        open={checkStage2Dialog}
        onHide={handleHideCheckStage2Dialog}
        onClaim={handleClaimStage2}
      />
    </StyledContainer>
  );
}

export default DeLotto;