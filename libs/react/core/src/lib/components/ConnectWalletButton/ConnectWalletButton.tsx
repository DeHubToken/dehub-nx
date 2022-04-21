import { DeHubConnectorNames } from '@dehub/shared/model';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { useWeb3Context } from '../../hooks';
import WalletModal from '../WalletModal';

const ConnectWalletButton = () => {
  const { login: web3Login } = useWeb3Context();

  const [walletModalOpen, setWalletModalOpen] = useState(false);

  return (
    <>
      <Button
        label="Connect Wallet"
        icon="fas fa-wallet"
        onClick={() => {
          setWalletModalOpen(true);
        }}
      ></Button>

      <WalletModal
        visible={walletModalOpen}
        onDismiss={() => {
          setWalletModalOpen(false);
        }}
        doConnect={(provider: DeHubConnectorNames, magicLinkEmail?: string) =>
          web3Login(provider, magicLinkEmail)
        }
      />
    </>
  );
};

export default ConnectWalletButton;
