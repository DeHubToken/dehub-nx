import { WalletModal } from '@dehub/react/ui';
import {
  moralisProviderLocalStorageKey,
  MoralisWeb3ProviderType,
  WalletConnectingState,
} from '@dehub/shared/model';
import { setupMetamaskNetwork } from '@dehub/shared/util';
import { Button } from 'primereact/button';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { getChainId } from '../../config/constants';
import { useSetWalletConnectingState } from '../../states/application/hooks';

const ConnectWalletButton = () => {
  const setWalletConnectingState = useSetWalletConnectingState();

  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const mountedRef = useRef(true);

  const { authenticate, logout } = useMoralis();

  const chainId = getChainId();

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const connectWallet = useCallback(
    (provider: MoralisWeb3ProviderType) => {
      const isMetamaskLogin = provider === 'metamask';

      setWalletConnectingState(WalletConnectingState.WAITING);
      window.localStorage.setItem(moralisProviderLocalStorageKey, provider);

      authenticate({
        provider,
        ...(isMetamaskLogin && { chainId }),
        signingMessage: 'DeHub Prize Draw',
        onError: (_error: Error) => {
          setWalletConnectingState(WalletConnectingState.INIT);
        },
        onSuccess: async _user => {
          if (isMetamaskLogin) {
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
              setWalletConnectingState(WalletConnectingState.COMPLETE);
            } else {
              logout();
              setWalletConnectingState(WalletConnectingState.INIT);
            }
          } else {
            setWalletConnectingState(WalletConnectingState.COMPLETE);
          }

          if (mountedRef.current) {
            setWalletModalOpen(false);
          }
        },
      });
    },
    [authenticate, chainId, logout, setWalletConnectingState]
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
