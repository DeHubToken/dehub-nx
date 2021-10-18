import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { LotteryStatus, LotteryTicket } from '../../config/constants/types';
import { Text } from '../../components/Text';
import { TicketIdLabel, TicketNumberLabel } from '../../components/TicketLabel';

interface ListTicketDialogProps {
  open: boolean;
  onHide: () => void;
  onBuy: () => void;
  roundId: string;
  tickets: LotteryTicket[] | undefined;
  status: LotteryStatus;
}

const ListTicketDialog = ({
  open,
  onHide,
  onBuy,
  roundId,
  tickets,
  status,
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
              return ticketAsInt > 0 ? (
                <TicketNumberLabel
                  key={`${index}`}
                  number={ticketAsInt}
                  className="mt-2"
                />
              ) : (
                <TicketIdLabel
                  key={`${index}`}
                  id={`#${ticket.id}`}
                  className="mt-2"
                />
              );
            })}
        </div>
        {status === LotteryStatus.OPEN && (
          <div className="flex flex-column mt-2">
            <Button className="justify-content-center" onClick={onBuy}>
              Buy Now
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default ListTicketDialog;
