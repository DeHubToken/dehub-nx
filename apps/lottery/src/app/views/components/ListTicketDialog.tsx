import uniqueId from 'lodash/uniqueId';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { Text } from '../../components/Text';
import { TicketNumberLabel } from '../../components/TicketLabel';

const ticketNumbers = [
  1141208, 1140208, 1101208,
];

interface ListTicketDialogProps {
  open: boolean;
  onHide: () => void;
  onBuy: () => void;
}

const ListTicketDialog = ({
  open,
  onHide,
  onBuy
}: ListTicketDialogProps) => {
  return (
    <Dialog
      visible={open}
      modal
      className="p-fluid"
      header="Round #166"
      style={{ width: '250px' }}
      onHide={onHide}
    >
      <div className="flex flex-column">
        <div className="flex justify-content-center mb-2">
          <Text>Your Tickets</Text>
        </div>
        <div className="mb-4">
          {
            ticketNumbers.map(number => {
              return (
                <TicketNumberLabel
                  key={uniqueId()}
                  number={number}
                  state="bought"
                  className="mt-2"
                />
              );
            })
          }
        </div>
        <div className="flex flex-column mt-2">
          <Button className="justify-content-center" onClick={onBuy}>
            Buy Now
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default ListTicketDialog;