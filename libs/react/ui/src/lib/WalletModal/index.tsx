import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { isMobile } from 'react-device-detect';

export type ProviderTypes = 'walletconnect' | 'metamask';

interface WalletModalProps {
  visible: boolean;
  onDismiss: () => void;
  doConnect: (provider: ProviderTypes) => void;
}

const WalletModal = ({ visible, onDismiss, doConnect }: WalletModalProps) => {
  return (
    <Dialog
      visible={visible}
      modal
      className="p-fluid"
      header="Connect Wallet"
      footer=" "
      style={{ width: '350px' }}
      onHide={onDismiss}
    >
      <div className="flex flex-column">
        <div className="flex flex-column mt-2 mb-3">
          <Button className="p-shadow-4" onClick={() => doConnect('metamask')}>
            <img
              style={{ height: '16px', paddingRight: '10px' }}
              src="assets/dehub/icons/metamask.svg"
              alt=""
            />
            Metamask
          </Button>
        </div>
        <div className="flex flex-column mt-2 mb-3">
          <Button
            className="p-shadow-4"
            onClick={() => doConnect('walletconnect')}
          >
            <img
              style={{ height: '11px', paddingRight: '10px' }}
              src="assets/dehub/icons/walletconnect.svg"
              alt=""
            />
            WalletConnect
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default WalletModal;
