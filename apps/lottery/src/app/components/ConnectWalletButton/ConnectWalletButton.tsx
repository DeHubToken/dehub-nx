import { useCallback, useEffect, useRef, useState } from 'react';

import { Hooks } from '@dehub/react/core';
import { WalletModal } from '@dehub/react/ui';
import { WalletConnectingState } from '@dehub/shared/config';

import { useSetWalletConnectingState } from '../../states/application/hooks';
import { getChainId } from '../../config/constants';
import { Button } from 'primereact/button';

const ConnectWalletButton = () => {
  const setWalletConnectingState = useSetWalletConnectingState();

  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const mountedRef = useRef(true);

  const { authenticate } = Hooks.useMoralisEthers();
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
        onSuccess: () => {
          setWalletConnectingState(WalletConnectingState.COMPLETE);
          if (mountedRef.current) {
            setWalletModalOpen(false);
          }
        },
      });
    },
    [authenticate, chainId, setWalletConnectingState]
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
