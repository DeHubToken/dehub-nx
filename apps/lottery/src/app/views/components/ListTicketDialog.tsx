import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { LotteryTicket } from '../../config/constants/types';
import { Text } from '../../components/Text';
import { TicketNumberLabel } from '../../components/TicketLabel';

interface ListTicketDialogProps {
  open: boolean;
  onHide: () => void;
  onBuy: () => void;
  roundId: string;
  tickets: LotteryTicket[] | undefined;
}

const ListTicketDialog = ({
  open,
  onHide,
  onBuy,
  roundId,
  tickets,
}: ListTicketDialogProps) => {
  return (
    <Dialog
      visible={open}
      modal
      className="p-fluid"
      header={`Round #${roundId}`}
      style={{ width: '250px' }}
      onHide={onHide}
    >
      <div className="flex flex-column">
        <div className="flex justify-content-center mb-2">
          <Text>Your Tickets</Text>
        </div>
        <div className="mb-4">
          {tickets &&
            tickets.map((ticket: LotteryTicket, index: number) => {
              const ticketAsInt = parseInt(ticket.number, 10);
              return (
                <TicketNumberLabel
                  key={`${index}`}
                  number={ticketAsInt}
                  state="bought"
                  className="mt-2"
                />
              );
            })}
        </div>
        <div className="flex flex-column mt-2">
          <Button className="justify-content-center" onClick={onBuy}>
            Buy Now
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ListTicketDialog;