import { uniqueId } from 'lodash-es';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { Text } from '../../components/Text';
import { TicketNumberLabel } from '../../components/TicketLabel';

interface TicketProps {
  id: number;
  number: number;
}

interface RoundTicketProps {
  round: string;
  tickets: TicketProps[];
  state: "bought" | "claimable" | "claimed";
}

const roundTickets: RoundTicketProps[] = [
  {
    round: "#165",
    tickets: [
      { id: 1, number: 1142111 },
      { id: 2, number: 1142112 },
      { id: 3, number: 1142113 },
      { id: 4, number: 1142114 }
    ],
    state: "claimable"
  },
  {
    round: "#166",
    tickets: [
      { id: 5, number: 1142111 },
      { id: 6, number: 1142112 }
    ],
    state: "claimed"
  }
];

interface ClaimStage1DialogProps {
  open: boolean;
  onHide: () => void;
  onClaim: (ticketIds: number[]) => void;
}

const ClaimStage1Dialog = ({
  open,
  onHide,
  onClaim
}: ClaimStage1DialogProps) => {
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
        <div className="mb-2 flex justify-content-center">
          <Text>Unclaimed Total</Text>
        </div>
        <div className="mb-3 flex justify-content-center">
          <Text className="font-bold">323,333,322.31234 DeHub</Text>
        </div>
        <div className="mb-3 flex flex-column align-items-center">
          <Text fontSize="12px">Will be burned in:</Text>
          <Text fontSize="12px">1d 30m 32s</Text>
        </div>
        {
          roundTickets.map((roundTicket: RoundTicketProps) => {
            return (
              <div key={uniqueId()} className="mt-2 mb-2">
                <div className="mb-2">
                  <Text>{roundTicket.round}</Text>
                </div>
                {
                  roundTicket.tickets.map((ticket: TicketProps) => {
                    return (
                      <TicketNumberLabel
                        key={uniqueId()}
                        number={ticket.number}
                        state={roundTicket.state}
                        className="mb-2"
                      />
                    );
                  })
                }
                <div className="flex flex-column mt-5">
                  <Button className="justify-content-center" onClick={() => onClaim([])}>
                    Claim
                  </Button>
                </div>
              </div>
            );
          })
        }
      </div>
    </Dialog>
  );
}

export default ClaimStage1Dialog;