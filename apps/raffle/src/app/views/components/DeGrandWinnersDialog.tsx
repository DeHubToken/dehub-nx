import { shortenAddress } from '@dehub/shared/utils';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { Header } from '../../components/Text';
import { TicketIdLabel } from '../../components/TicketLabel';
import { DeGrandHistory } from '../../states/special-raffle/types';

interface DeGrandWinnersDialogProps {
  open: boolean;
  onHide: () => void;
  deGrand: DeGrandHistory;
}

const DeGrandWinnersDialog = ({
  open,
  onHide,
  deGrand,
}: DeGrandWinnersDialogProps) => {
  const toast = useRef<Toast>(null);

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={open}
        modal
        className="p-fluid"
        header="DeGrand Winners"
        style={{ width: '300px' }}
        onHide={onHide}
      >
        <div className="flex flex-column">
          <div className="mb-2 flex justify-content-center">
            <Header>{`Round #${deGrand.roundId}`}</Header>
          </div>
          <div className="mb-2 flex justify-content-center">
            <Header>{`Prize: ${deGrand.prize.title}`}</Header>
          </div>
          <div className="mb-3 flex flex-column">
            <div className="mb-4">
              {deGrand.winningAddresses &&
                deGrand.winningAddresses.map(
                  (winner: string, index: number) => {
                    return (
                      <TicketIdLabel
                        key={`${index}`}
                        id={`#${shortenAddress(winner)}`}
                        className="mb-2"
                      />
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DeGrandWinnersDialog;
