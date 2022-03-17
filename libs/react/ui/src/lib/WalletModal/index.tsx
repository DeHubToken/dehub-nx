import { ReactComponent as MetaMaskIcon } from '@dehub/shared/asset/dehub/icons/metamask.svg';
import { ReactComponent as TrustWalletIcon } from '@dehub/shared/asset/dehub/icons/trustwallet.svg';
import { ReactComponent as WalletConnectIcon } from '@dehub/shared/asset/dehub/icons/walletconnect.svg';
import { MoralisWeb3ProviderType } from '@dehub/shared/model';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
interface WalletModalProps {
  visible: boolean;
  onDismiss: () => void;
  doConnect: (provider: MoralisWeb3ProviderType) => void;
}

const WalletModal = ({ visible, onDismiss, doConnect }: WalletModalProps) => {
  return (
    <Dialog
      visible={visible}
      modal
      className="p-fluid"
      header="Connect Wallet"
      style={{ width: '350px' }}
      onHide={onDismiss}
    >
      <div className="mt-2 mb-3">
        <Button
          icon={
            <MetaMaskIcon
              style={{ width: '32px', height: '16px', paddingRight: '10px' }}
            />
          }
          iconPos="left"
          label="Metamask"
          onClick={() => doConnect('metamask')}
        ></Button>
      </div>
      <div className="mt-2 mb-3 md:hidden">
        <Button
          icon={
            <TrustWalletIcon
              style={{
                width: '32px',
                height: '20px',
                paddingRight: '10px',
                marginLeft: '-1px',
              }}
            />
          }
          iconPos="left"
          label="Trust Wallet"
          onClick={() => doConnect('metamask')}
        ></Button>
      </div>
      <div className="mt-2 mb-3">
        <Button
          icon={
            <WalletConnectIcon
              style={{ width: '32px', height: '11px', paddingRight: '10px' }}
            />
          }
          iconPos="left"
          label="WalletConnect"
          onClick={() => doConnect('walletconnect')}
        ></Button>
      </div>
    </Dialog>
  );
};

export default WalletModal;
