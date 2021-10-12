import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { getFullDisplayBalance } from '@dehub/shared/utils';

import { Header, Text } from '../../components/Text';
import { FetchStatus, useGetDehubBalance } from '../../hooks/useTokenBalance';
import { useLottery } from '../../states/standard-lottery/hooks';

interface BuyStandardTicketDialogProps {
  open: boolean;
  onHide: () => void;
  onBuy: (input: number[]) => void;
}

const BuyStandardTicketDialog = ({
  open,
  onHide,
  onBuy,
}: BuyStandardTicketDialogProps) => {
  const { balance: dehubBalance, fetchStatus } = useGetDehubBalance();

  const {
    currentRound: { priceTicketInDehub },
  } = useLottery();

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
          {fetchStatus === FetchStatus.SUCCESS ? (
            <Text fontSize="12px">
              DeHub Balance: {getFullDisplayBalance(dehubBalance, 5, 5)}
            </Text>
          ) : (
            <Text fontSize="12px">Loading...</Text>
          )}
        </div>
        <div className="flex flex-column mt-2">
          <Button className="justify-content-center" onClick={() => onBuy([1])}>
            Buy a Single Ticket
          </Button>
        </div>
        <div className="flex justify-content-end mt-2">
          <Text fontSize="14px">
            Price: ~{getFullDisplayBalance(priceTicketInDehub, 5, 5)} DeHub
          </Text>
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
            <Button onClick={() => onBuy([5])}>Buy 5 + 1 Free</Button>
          </div>
          <div className="col-6 mt-2 flex justify-content-end">
            <Text>
              ~{getFullDisplayBalance(priceTicketInDehub.times(5), 5, 5)}
            </Text>
          </div>
          <div className="col-6 mt-2">
            <Button onClick={() => onBuy([10])}>Buy 10 + 3 Free</Button>
          </div>
          <div className="col-6 mt-2 flex justify-content-end">
            <Text>
              ~{getFullDisplayBalance(priceTicketInDehub.times(10), 5, 5)}
            </Text>
          </div>
          <div className="col-6 mt-2">
            <Button onClick={() => onBuy([15])}>Buy 15 + 5 Free</Button>
          </div>
          <div className="col-6 mt-2 flex justify-content-end">
            <Text>
              ~{getFullDisplayBalance(priceTicketInDehub.times(15), 5, 5)}
            </Text>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default BuyStandardTicketDialog;