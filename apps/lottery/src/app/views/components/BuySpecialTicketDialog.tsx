import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import BalanceInput from '../../components/BalanceInput/BalanceInput';
import { Text } from '../../components/Text';

interface BuySpecialTicketDialogProps {
  open: boolean;
  onHide: () => void;
  onUserInput: (input: string) => void;
}

const BuySpecialTicketDialog = ({
  open,
  onHide,
  onUserInput,
}: BuySpecialTicketDialogProps) => {
  return (
    <Dialog
      visible={open}
      modal
      className="p-fluid"
      header="Buy Tickets"
      style={{ width: '350px' }}
      onHide={onHide}
    >
      <div className="flex flex-column">
        <div className="flex justify-content-between mb-2">
          <Text>Buy:</Text>
          <Text className="font-bold">Tickets</Text>
        </div>
        <BalanceInput
          placeholder="0"
          value="0"
          onUserInput={onUserInput}
          currencyValue={`~0.00000 Dehub`}
        />
        <div className="flex justify-content-end mt-2 mb-5">
          <Text fontSize="12px">DeHub Balance: 3,000,000.12343</Text>
        </div>
        <div className="flex flex-column mt-2">
          <Button className="justify-content-center">Buy Now</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default BuySpecialTicketDialog;