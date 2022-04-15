import { useToast } from '@dehub/react/core';
import { ReactComponent as BscIcon } from '@dehub/shared/asset/dehub/icons/bsc.svg';
import { ReactComponent as CoinbaseIcon } from '@dehub/shared/asset/dehub/icons/coinbase.svg';
import Fortmatic from '@dehub/shared/asset/dehub/icons/fortmatic.png';
import { ReactComponent as MetaMaskIcon } from '@dehub/shared/asset/dehub/icons/metamask.svg';
import { ReactComponent as TrustWalletIcon } from '@dehub/shared/asset/dehub/icons/trustwallet.svg';
import { ReactComponent as WalletConnectIcon } from '@dehub/shared/asset/dehub/icons/walletconnect.svg';
import {
  DeHubConnectorNames,
  MoralisConnectorNames,
  Web3ConnectorNames,
} from '@dehub/shared/model';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import styled from 'styled-components';

interface WalletModalProps {
  visible: boolean;
  onDismiss: () => void;
  doConnect: (provider: DeHubConnectorNames) => void;
}

const WalletButton = styled(Button)`
  color: var(--surface-500) !important;
  &:hover {
    color: white !important;
    transform: scale(103%);
  }
`;

const WalletModal = ({ visible, onDismiss, doConnect }: WalletModalProps) => {
  const { toastInfo } = useToast();

  return (
    <Dialog
      visible={visible}
      modal
      className="p-fluid border-neon-1"
      header="Connect Wallet"
      style={{ width: '350px' }}
      onHide={onDismiss}
    >
      <div className="mt-2 mb-3">
        <WalletButton
          className="flex justify-content-between text-500"
          onClick={() => doConnect(MoralisConnectorNames.Injected)}
        >
          <div>Browser Wallet</div>
          <div className="flex flex-row align-items-center">
            <MetaMaskIcon style={{ width: '32px', height: '16px' }} />
            <TrustWalletIcon
              style={{
                width: '32px',
                height: '20px',
              }}
            />
          </div>
        </WalletButton>
      </div>

      <div className="mt-2 mb-3">
        <WalletButton
          className="flex justify-content-between text-500"
          onClick={() => doConnect(MoralisConnectorNames.WalletConnect)}
        >
          <div>WalletConnect</div>
          <div className="flex flex-row align-items-center">
            <WalletConnectIcon style={{ width: '32px', height: '11px' }} />
          </div>
        </WalletButton>
      </div>

      <div className="mt-2 mb-3">
        <WalletButton
          className="flex justify-content-between text-500"
          onClick={() => doConnect(Web3ConnectorNames.WalletLink)}
        >
          <div>Coinbase</div>
          <div className="flex flex-row align-items-center">
            <CoinbaseIcon style={{ width: '32px', height: '20px' }} />
          </div>
        </WalletButton>
      </div>

      <div className="mt-2 mb-3">
        <WalletButton
          className="flex justify-content-between text-500"
          onClick={() => doConnect(Web3ConnectorNames.Fortmatic)}
        >
          <div>Fortmatic</div>
          <div className="flex flex-row align-items-center">
            <img
              src={Fortmatic}
              alt="Fortmatic"
              style={{ width: '20px', height: '20px', marginRight: '6px' }}
            />
          </div>
        </WalletButton>
      </div>

      <div className="mt-2 mb-3">
        <WalletButton
          className="flex justify-content-between text-500"
          onClick={() => doConnect(Web3ConnectorNames.BSC)}
        >
          <div>Binance</div>
          <div className="flex flex-row align-items-center">
            <BscIcon style={{ width: '32px', height: '20px' }} />
          </div>
        </WalletButton>
      </div>
    </Dialog>
  );
};

export default WalletModal;
