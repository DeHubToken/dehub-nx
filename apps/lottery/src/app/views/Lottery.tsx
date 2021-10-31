import { useEffect, useState } from 'react';
import { Moralis } from 'moralis';

import { Hooks } from '@dehub/react/core';
import { Footer, Header, Loader } from '@dehub/react/ui';
import { WalletConnectingState } from '@dehub/shared/config';

import { getChainId, getChainIdHex } from '../config/constants';
import UserMenu from '../components/UserMenu';
import { useWalletConnectingState } from '../states/application/hooks';
import DeGrand from '../views/DeGrand';
import DeLotto from '../views/DeLotto';
import FlexLine from './components/FlexLine';

const initMessage = {
  header: '',
  text: '',
};

export default function Lottery() {
  const [showLoader, setShowLoader] = useState(false);
  const [message, setMessage] = useState(initMessage);
  const walletConnectingState = useWalletConnectingState();

  const { clearProvider } = Hooks.useMoralisEthers();

  useEffect(() => {
    Moralis.Web3.onChainChanged(newChainId => {
      if (newChainId !== getChainIdHex()) {
        clearProvider();
      }
    });
  }, [clearProvider]);

  useEffect(() => {
    if (walletConnectingState === WalletConnectingState.WAITING) {
      setShowLoader(true);
      setMessage({
        header: 'Waiting',
        text: 'Please confirm with your wallet.',
      });
    } else if (walletConnectingState === WalletConnectingState.SWITCH_NETWORK) {
      setShowLoader(true);
      setMessage({
        header: 'Waiting',
        text: 'Please confirm network switch with your wallet.',
      });
    } else if (walletConnectingState === WalletConnectingState.ADD_NETWORK) {
      setShowLoader(true);
      setMessage({
        header: 'Waiting',
        text: 'Please confirm network add with your wallet.',
      });
    } else {
      setShowLoader(false);
      setMessage(initMessage);
    }
  }, [walletConnectingState]);

  return (
    <div>
      {showLoader ? (
        <Loader header={message.header} text={message.text} />
      ) : (
        <div
          className="layout-wrapper"
          style={{
            background:
              'linear-gradient(45deg, rgba(11, 17, 19, 0.95), rgba(5, 17, 24, 0.9) 46%, rgba(6, 12, 29, 0.8) 71%, rgba(50, 19, 56, 0.95)), url("assets/img/prize-draw-bg.jpg") no-repeat fixed center center /cover',
          }}
        >
          <Header
            userMenu={<UserMenu />}
            logo={{
              href: 'https://dehub.net',
              icon: 'assets/dehub/logo-dehub-white.svg',
            }}
          />
          <div className="layout-main">
            <div className="layout-content">
              <FlexLine className="md:flex-column align-items-center justify-content-between">
                <img
                  src="../../assets/img/prize-draw-logo.png"
                  className="anim-float-1"
                  alt="Prize Draw Logo"
                  style={{ maxWidth: '300px' }}
                />
              </FlexLine>
              <div className="my-8">
                <DeLotto />
              </div>
              <div className="my-8">
                <DeGrand />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
