import { useState } from 'react';

import { Button } from 'primereact/button';

import BuySpecialTicketDialog from './components/BuySpecialTicketDialog';
import ClaimStage2Dialog from './components/ClaimStage2Dialog';
import FlexLine from './components/FlexLine';
import ListTicketDialog from './components/ListTicketDialog';
import { Header, Text } from '../components/Text';
import { LotteryStatus } from '../config/constants/types';

const DeLottoStage2 = () => {
  const [listTicketDialog, setListTicketDialog] = useState(false);
  const [buySpecialTicketDialog, setBuySpecialTicketDialog] = useState(false);
  const [checkStage2Dialog, setCheckStage2Dialog] = useState(false);

  const handleShowDialog = (dialogKind: string) => {
    if (dialogKind === 'ListTicket') {
      setListTicketDialog(true);
    } else if (dialogKind === 'BuySpecialTicket') {
      setBuySpecialTicketDialog(true);
    }
  };
  const handleHideDialog = (dialogKind: string) => {
    if (dialogKind === 'ListTicket') {
      setListTicketDialog(false);
    } else if (dialogKind === 'BuySpecialTicket') {
      setBuySpecialTicketDialog(false);
    }
  };

  const handleInputChange = (input: string) => {
    console.log('Balance input=', input);
  };

  const handleClaimStage2 = () => {
    console.log('Claim stage2');
  };

  return (
    <>
      <h1 className="text-center">1d 2h 26m until the draw</h1>

      <FlexLine className="align-items-center justify-content-between">
        <Header>Next Draw:</Header>
        <Text>#166 | Draw: Sep 23, 2021, 3:00 PM</Text>
      </FlexLine>

      <FlexLine className="align-items-center justify-content-between">
        <Header>Prize Pot:</Header>
        <Text>300,000,000 $DeHub</Text>
      </FlexLine>

      <FlexLine className="align-items-center md:align-items-start justify-content-between">
        <Header>Your Tickets:</Header>
        <div className="flex flex-column align-items-center md:align-items-end">
          <Text>
            You have <span className="font-bold">10</span> tickets this round.
          </Text>
          <Button
            className="p-button-link p-0"
            onClick={() => handleShowDialog('ListTicket')}
          >
            View your tickets
          </Button>
          <Button
            className="button-link mt-3"
            onClick={() => handleShowDialog('BuySpecialTicket')}
          >
            Buy Special Tickets
          </Button>
        </div>
      </FlexLine>

      <div className="flex flex-row justify-content-center">
        <div className="flex flex-column">
          <Text>Are you a winner?</Text>
          <Button
            className="mt-2 justify-content-center"
            onClick={() => handleShowDialog('CheckStage1')}
          >
            Check Now
          </Button>
        </div>
        <div className="flex flex-column ml-3">
          <Text>Are you a winner stage2?</Text>
          <Button
            className="mt-2 justify-content-center"
            onClick={() => handleShowDialog('CheckStage2')}
          >
            Check Now
          </Button>
        </div>
      </div>

      <ListTicketDialog
        open={listTicketDialog}
        onHide={() => handleHideDialog('ListTicket')}
        onBuy={() => handleShowDialog('BuyStandardTicket')}
        roundId=""
        tickets={[]}
        status={LotteryStatus.PENDING}
      />

      <BuySpecialTicketDialog
        open={buySpecialTicketDialog}
        onHide={() => handleHideDialog('BuyStandardTicket')}
        onUserInput={handleInputChange}
      />

      <ClaimStage2Dialog
        open={checkStage2Dialog}
        onHide={() => handleHideDialog('CheckStage2')}
        onClaim={handleClaimStage2}
      />
    </>
  );
};

export default DeLottoStage2;
