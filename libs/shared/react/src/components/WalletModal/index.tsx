import { useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import { useMoralis } from 'react-moralis';
import { Moralis } from 'moralis';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { WalletConnectingState } from '@dehub/shared/config';

import { useMoralisEthers } from '../../hooks';
import {
  useWalletModalOpen,
  useWalletModalToggle,
  useSetWalletConnectingState
} from '../../states/application/hooks';

const WalletModal = () => {
  const walletModalOpen = useWalletModalOpen();
  const toggleWalletModal = useWalletModalToggle();
  const setWalletConnectingState = useSetWalletConnectingState();

  const {
    authenticate
  } = useMoralis();

  const { activateProvider } = useMoralisEthers();

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
    <Dialog
      visible={walletModalOpen}
      modal
      className="p-fluid"
      header="Connect Wallet"
      style={{ width: '350px' }}
      onHide={toggleWalletModal}
    >
      <div className="flex flex-column">
        {
          !isMobile ?
          (
            <div className="flex flex-column mt-2">
              <Button
                className="justify-content-center"
                onClick={() => connectWallet(null)}
              >
                MetaMask
              </Button>
              <div className="text-center">Easy-to-use browser extension</div>
            </div>
          // eslint-disable-next-line react/jsx-no-useless-fragment
          ) : <></>
        }
        <div className="flex flex-column mt-2">
          <Button
            className="justify-content-center"
            onClick={() => connectWallet("walletconnect")}
          >
            WalletConnect
          </Button>
          <div className="text-center">Connect to Trust Wallet, Rainbow Wallet and more...</div>
        </div>
      </div>
    </Dialog>
  )
}

export default WalletModal;