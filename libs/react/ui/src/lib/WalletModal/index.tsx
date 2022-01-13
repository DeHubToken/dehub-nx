import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ReactComponent as MetaMaskIcon } from '@dehub/shared/assets/dehub/icons/metamask.svg';
import { ReactComponent as TrustWalletIcon } from '@dehub/shared/assets/dehub/icons/trustwallet.svg';
import { ReactComponent as WalletConnectIcon } from '@dehub/shared/assets/dehub/icons/walletconnect.svg';
import { ProviderTypes } from '@dehub/shared/moralis';
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
            <MetaMaskIcon
              style={{ width: '32px', height: '16px', paddingRight: '10px' }}
            />
            Metamask
          </Button>
        </div>
        <div className="flex flex-column mt-2 mb-3 md:hidden">
          <Button className="p-shadow-4" onClick={() => doConnect('metamask')}>
            <TrustWalletIcon
              style={{
                width: '32px',
                height: '20px',
                paddingRight: '10px',
                marginLeft: '-1px',
              }}
            />
            Trust Wallet
          </Button>
        </div>
        <div className="flex flex-column mt-2 mb-3">
          <Button
            className="p-shadow-4"
            onClick={() => doConnect('walletconnect')}
          >
            <WalletConnectIcon
              style={{ width: '32px', height: '11px', paddingRight: '10px' }}
            />
            WalletConnect
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default WalletModal;
