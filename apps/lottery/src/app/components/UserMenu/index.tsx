import { memo, useEffect, useState, useCallback } from 'react';
import { useMoralis } from 'react-moralis';
import { Moralis } from 'moralis';

import { Hooks } from '@dehub/react/core';
import { WalletModal } from '@dehub/react/ui';
import { WalletConnectingState } from '@dehub/shared/config';
import { shortenAddress } from '@dehub/shared/utils';

import {
  useWalletModalOpen,
  useWalletModalToggle,
  useSetWalletConnectingState
} from '../../states/application/hooks';

const UserMenu = () => {
  const walletModalOpen = useWalletModalOpen();
  const toggleWalletModal = useWalletModalToggle();
  const setWalletConnectingState = useSetWalletConnectingState();

  const { account, activateProvider } = Hooks.useMoralisEthers();

  const [signerAddress, setSignerAddress] = useState<string>("Connect Wallet");

  useEffect(() => {
    if (account) {
      setSignerAddress(shortenAddress(account));
    } else {
      setSignerAddress("Connect Wallet");
    }
  }, [account]);

  const {
    authenticate,
    authError,
    isAuthenticated,
    logout
  } = useMoralis();

  const connectWallet = useCallback((provider) => {
    setWalletConnectingState(WalletConnectingState.WAITING);
    if (provider) {
      authenticate({
        provider: "walletconnect",
        onError: (error: Error) => {
          setWalletConnectingState(WalletConnectingState.INIT);
        },
        onSuccess: (user: Moralis.User) => {
          activateProvider();
          
          setWalletConnectingState(WalletConnectingState.COMPLETE);
          toggleWalletModal();
        }
      })
    } else {
      authenticate({
        onError: (error: Error) => {
          setWalletConnectingState(WalletConnectingState.INIT);
        },
        onSuccess: async (user: Moralis.User) => {
          activateProvider();

          setWalletConnectingState(WalletConnectingState.COMPLETE);
          toggleWalletModal();
        }
      })
    }
  }, [authenticate, setWalletConnectingState, activateProvider, toggleWalletModal]);

  return (
    <>
      {
        authError ? <div className="text-center">Wrong Network</div> : <div>&nbsp;</div>
      }
      <ul className="layout-topbar-actions">
        <li>
          {
            isAuthenticated ? (
              <button className="landing-button p-button" onClick={() => logout()}>
                <span className="p-button-text">
                  {signerAddress}
                </span>
              </button>
            ) : (
              <button className="landing-button p-button">
                <span className="p-button-text" onClick={toggleWalletModal}>
                  Connect Wallet
                </span>
              </button>
            )
          }
        </li>
      </ul>
      <WalletModal
        visible={walletModalOpen}
        onDismiss={toggleWalletModal}
        doConnect={connectWallet}
      />
    </>
  );
}

export default UserMenu;
