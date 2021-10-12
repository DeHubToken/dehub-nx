import { useCallback } from 'react';
import { Moralis } from 'moralis';
import { useMoralis } from 'react-moralis';

import { Hooks } from '@dehub/react/core';
import { WalletModal } from '@dehub/react/ui';
import { WalletConnectingState } from '@dehub/shared/config';

import {
  useWalletModalOpen,
  useWalletModalToggle,
  useSetWalletConnectingState,
} from '../../states/application/hooks';

const ConnectWalletButton = () => {
  const walletModalOpen = useWalletModalOpen();
  const toggleWalletModal = useWalletModalToggle();
  const setWalletConnectingState = useSetWalletConnectingState();

  const { activateProvider } = Hooks.useMoralisEthers();

  const { authenticate } = useMoralis();

  const connectWallet = useCallback(
    provider => {
      setWalletConnectingState(WalletConnectingState.WAITING);
      if (provider) {
        authenticate({
          provider: 'walletconnect',
          onError: (error: Error) => {
            setWalletConnectingState(WalletConnectingState.INIT);
          },
          onSuccess: (user: Moralis.User) => {
            activateProvider();

            setWalletConnectingState(WalletConnectingState.COMPLETE);
            toggleWalletModal();
          },
        });
      } else {
        authenticate({
          onError: (error: Error) => {
            setWalletConnectingState(WalletConnectingState.INIT);
          },
          onSuccess: async (user: Moralis.User) => {
            activateProvider();

            setWalletConnectingState(WalletConnectingState.COMPLETE);
            toggleWalletModal();
          },
        });
      }
    },
    [
      authenticate,
      setWalletConnectingState,
      activateProvider,
      toggleWalletModal,
    ]
  );

  return (
    <>
      <button className="landing-button p-button">
        <span className="p-button-text" onClick={toggleWalletModal}>
          Connect Wallet
        </span>
      </button>

      <WalletModal
        visible={walletModalOpen}
        onDismiss={toggleWalletModal}
        doConnect={connectWallet}
      />
    </>
  );
};

export default ConnectWalletButton;
