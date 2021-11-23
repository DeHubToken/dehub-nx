import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Hooks } from '@dehub/react/core';
import { WalletModal } from '@dehub/react/ui';
import { setupNetwork } from '@dehub/shared/moralis';
import { getChainId } from '../config/constants';
import { WalletConnectingState } from '@dehub/shared/config';
import { useSetWalletConnectingState } from '../state/application/hooks';

const UnlockButton = () => {
  const setWalletConnectingState = useSetWalletConnectingState();

  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const mountedRef = useRef(true);

  const { authenticate, logout, activateProvider } = Hooks.useMoralisEthers();
  const chainId = getChainId();

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const connectWallet = useCallback(
    provider => {
      setWalletConnectingState(WalletConnectingState.WAITING);
      window.localStorage.setItem('providerName', provider);
      authenticate({
        chainId: chainId,
        provider,
        onError: (error: Error) => {
          setWalletConnectingState(WalletConnectingState.INIT);
        },
        onSuccess: async () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const ethereum = (window as any).ethereum;
          if (ethereum) {
            const onSwitchNetwork = () => {
              setWalletConnectingState(WalletConnectingState.SWITCH_NETWORK);
            };
            const onAddNetwork = () => {
              setWalletConnectingState(WalletConnectingState.ADD_NETWORK);
            };
            if (
              await setupNetwork(getChainId(), onSwitchNetwork, onAddNetwork)
            ) {
              activateProvider();
              setWalletConnectingState(WalletConnectingState.COMPLETE);
            } else {
              logout();
              setWalletConnectingState(WalletConnectingState.INIT);
            }
          } else {
            activateProvider();
            setWalletConnectingState(WalletConnectingState.COMPLETE);
          }

          if (mountedRef.current) {
            setWalletModalOpen(false);
          }
        },
      });
    },
    [authenticate, chainId, activateProvider, logout, setWalletConnectingState]
  );

  return (
    <>
      <Button
        label="Unlock Wallet"
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

export default UnlockButton;
