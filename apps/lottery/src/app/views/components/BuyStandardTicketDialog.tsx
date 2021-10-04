import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import {
  Header,
  Text
} from '../../components/Text';

interface BuyStandardTicketDialogProps {
  open: boolean;
  onHide: () => void;
  onBuy: (input: number) => void;
}

const BuyStandardTicketDialog = ({
  open,
  onHide,
  onBuy
}: BuyStandardTicketDialogProps) => {
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
        <div className="flex justify-content-end">
          <Text fontSize="12px">DeHub Balance: 3,000,000.12343</Text>
        </div>
        <div className="flex flex-column mt-2">
          <Button className="justify-content-center" onClick={() => onBuy(1)}>
            Buy a Single Ticket
          </Button>
        </div>
        <div className="flex justify-content-end mt-2">
          <Text fontSize="14px">Price: ~10,000.00000 DeHub</Text>
        </div>
        <div className="flex justify-content-center mt-4 mb-4">
          <Header>Or buy bundles instantly!</Header>
        </div>
        <div className="grid grid-nogutter align-items-center">
          <div className="col-6" />
          <div className="col-6 flex justify-content-end">
            <Text className="font-bold">Price in Dehub</Text>
          </div>
          <div className="col-6 mt-2">
            <Button onClick={() => onBuy(15)}>Buy 5 + 1 Free</Button>
          </div>
          <div className="col-6 mt-2 flex justify-content-end">
            <Text>~50,000.00000</Text>
          </div>
          <div className="col-6 mt-2">
            <Button onClick={() => onBuy(10)}>Buy 10 + 3 Free</Button>
          </div>
          <div className="col-6 mt-2 flex justify-content-end">
            <Text>~100,000.00000</Text>
          </div>
          <div className="col-6 mt-2">
            <Button onClick={() => onBuy(15)}>Buy 15 + 5 Free</Button>
          </div>
          <div className="col-6 mt-2 flex justify-content-end">
            <Text>~150,000.00000</Text>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default BuyStandardTicketDialog;