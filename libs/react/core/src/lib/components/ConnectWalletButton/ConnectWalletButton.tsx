import { WalletModal } from '@dehub/react/ui';
import { DeHubConnectorNames } from '@dehub/shared/model';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { useWeb3Context } from '../../hooks';

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
        doConnect={(provider: DeHubConnectorNames) => web3Login(provider)}
      />
    </>
  );
};

export default ConnectWalletButton;
