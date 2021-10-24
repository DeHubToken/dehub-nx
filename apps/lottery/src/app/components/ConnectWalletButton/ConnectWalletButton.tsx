import { useCallback, useState } from 'react';

import { Hooks } from '@dehub/react/core';
import { WalletModal } from '@dehub/react/ui';
import { WalletConnectingState } from '@dehub/shared/config';

import { useSetWalletConnectingState } from '../../states/application/hooks';
import { getChainId } from '../../config/constants';
import { Button } from 'primereact/button';

const ConnectWalletButton = () => {
  const setWalletConnectingState = useSetWalletConnectingState();

  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const { authenticate } = Hooks.useMoralisEthers();
  const chainId = getChainId();

  const connectWallet = useCallback(
    provider => {
      setWalletConnectingState(WalletConnectingState.WAITING);
      if (provider) {
        authenticate({
          provider: 'walletconnect',
          chainId: chainId,
          onError: (error: Error) => {
            setWalletConnectingState(WalletConnectingState.INIT);
          },
          onSuccess: () => {
            setWalletConnectingState(WalletConnectingState.COMPLETE);
            setWalletModalOpen(false);
          },
        });
      } else {
        authenticate({
          chainId: chainId,
          onError: (error: Error) => {
            setWalletConnectingState(WalletConnectingState.INIT);
          },
          onSuccess: () => {
            setWalletConnectingState(WalletConnectingState.COMPLETE);
            setWalletModalOpen(false);
          },
        });
      }
    },
    [authenticate, chainId, setWalletConnectingState, setWalletModalOpen]
  );

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
        doConnect={connectWallet}
      />
    </>
  );
};

export default ConnectWalletButton;
