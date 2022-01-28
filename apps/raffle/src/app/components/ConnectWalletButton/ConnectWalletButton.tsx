import { Hooks } from '@dehub/react/core';
import { WalletModal } from '@dehub/react/ui';
import { ConnectorId, WalletConnectingState } from '@dehub/shared/models';
import { setupMetamaskNetwork } from '@dehub/shared/utils';
import { Button } from 'primereact/button';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getChainId } from '../../config/constants';
import { useSetWalletConnectingState } from '../../states/application/hooks';

const ConnectWalletButton = () => {
  const setWalletConnectingState = useSetWalletConnectingState();

  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const mountedRef = useRef(true);

  const { authenticate, logout, activateProvider } = Hooks.useMoralisEthers();
  // const { authenticate, logout } = useMoralis();
  const chainId = getChainId();

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const connectWallet = useCallback(
    (connectorId: ConnectorId) => {
      const isMetamaskLogin = connectorId === 'metamask';

      setWalletConnectingState(WalletConnectingState.WAITING);
      window.localStorage.setItem('connectorId', connectorId);
      console.log('chainId', chainId);
      authenticate({
        ...(!isMetamaskLogin && { provider: connectorId }),
        ...(isMetamaskLogin && { chainId }),
        signingMessage: 'DeHub Prize Draw',
        onError: (_error: Error) => {
          setWalletConnectingState(WalletConnectingState.INIT);
        },
        onSuccess: async account => {
          console.log('account', account);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const ethereum = (window as any).ethereum;
          if (/* ethereum &&  */ isMetamaskLogin) {
            const onSwitchNetwork = () => {
              setWalletConnectingState(WalletConnectingState.SWITCH_NETWORK);
            };
            const onAddNetwork = () => {
              setWalletConnectingState(WalletConnectingState.ADD_NETWORK);
            };
            if (
              await setupMetamaskNetwork(
                getChainId(),
                onSwitchNetwork,
                onAddNetwork
              )
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
