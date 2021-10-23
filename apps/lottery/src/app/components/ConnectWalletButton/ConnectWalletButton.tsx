import { useCallback } from 'react';

import { Hooks } from '@dehub/react/core';
import { WalletModal } from '@dehub/react/ui';
import { WalletConnectingState } from '@dehub/shared/config';

import {
  useWalletModalOpen,
  useWalletModalToggle,
  useSetWalletConnectingState,
} from '../../states/application/hooks';
import { getChainId } from '../../config/constants';
import { Button } from 'primereact/button';

const ConnectWalletButton = () => {
  const walletModalOpen = useWalletModalOpen();
  const toggleWalletModal = useWalletModalToggle();
  const setWalletConnectingState = useSetWalletConnectingState();

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
            toggleWalletModal();
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
            toggleWalletModal();
          },
        });
      }
    },
    [authenticate, chainId, setWalletConnectingState, toggleWalletModal]
  );

  return (
    <>
      <Button
        label="Connect Wallet"
        icon="fas fa-wallet"
        onClick={toggleWalletModal}
      ></Button>

      <WalletModal
        visible={walletModalOpen}
        onDismiss={toggleWalletModal}
        doConnect={connectWallet}
      />
    </>
  );
};

export default ConnectWalletButton;
