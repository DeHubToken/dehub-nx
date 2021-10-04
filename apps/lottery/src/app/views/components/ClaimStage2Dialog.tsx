import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { Text } from '../../components/Text';
import { TicketIdLabel } from '../../components/TicketLabel';

interface ClaimStage2DialogProps {
  open: boolean;
  onHide: () => void;
  onClaim: () => void;
}

const ClaimStage2Dialog = ({
  open,
  onHide,
  onClaim
}: ClaimStage2DialogProps) => {
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
          <Text>Your winnings</Text>
        </div>
        <div className="mb-3 flex justify-content-center">
          <Text className="font-bold">323,333,322.31234 DeHub</Text>
        </div>
        <div className="mb-3 flex flex-column align-items-center">
          <Text fontSize="12px">Will be burned in:</Text>
          <Text fontSize="12px">1d 30m 32s</Text>
        </div>
        <div className="mb-5">
          <TicketIdLabel
            id="#1352"
            state="claimable"
          />
        </div>
        <div className="flex flex-column mt-2">
          <Button className="justify-content-center" onClick={onClaim}>
            Claim
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default ClaimStage2Dialog;