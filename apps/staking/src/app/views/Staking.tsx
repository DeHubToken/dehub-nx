import { Hooks } from '@dehub/react/core';
import { Footer, Header, Loader } from '@dehub/react/ui';
import { WalletConnectingState } from '@dehub/shared/config';
import { iOS } from '@dehub/shared/utils';
import { Moralis } from 'moralis';
import { useEffect, useState } from 'react';
import { environment } from '../../environments/environment';
import PageMeta from '../components/Layout/PageMeta';
import UserMenu from '../components/UserMenu';
import { getChainIdHex } from '../config/constants';
import { useWalletConnectingState } from '../state/application/hooks';
import StakedBottomInfoBox from '../views/StakedBottomInfoBox';
import StakedTopInfoBox from '../views/StakedTopInfoBox';

const initMessage = {
  header: '',
  text: '',
};

export default function Staking() {
  const [showLoader, setShowLoader] = useState(false);
  const [message, setMessage] = useState(initMessage);
  const walletConnectingState = useWalletConnectingState();

  const { clearProvider } = Hooks.useMoralisEthers();

  const {
    baseUrl: path,
    dehub: { landing },
  } = environment;

  /*
   * Hack to avoid trustwallet redirecting to a open in app website on iOS...
   * Ref: https://github.com/WalletConnect/walletconnect-monorepo/issues/552
   */
  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && iOS()) {
        window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');
      }
    });
  }, []);

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
      <PageMeta />
      {showLoader ? (
        <Loader title={message.header} subtitle={message.text} />
      ) : (
        <div
          className="layout-wrapper"
          style={{
            background: `linear-gradient(45deg, rgba(11, 17, 19, 0.95), rgba(5, 17, 24, 0.9) 46%, rgba(6, 12, 29, 0.8) 71%, rgba(50, 19, 56, 0.95)), url("${path}/assets/img/prize-draw-bg.jpg") no-repeat fixed center center /cover`,
          }}
        >
          <Header
            userMenu={<UserMenu />}
            logo={{
              href: 'https://dehub.net',
              icon: `${path}/assets/dehub/logo-dehub-white.svg`,
            }}
          />
          <div className="layout-main">
            <div className="layout-content">
              <div className="my-8">
                <StakedTopInfoBox />
              </div>
              <div className="my-8">
                <StakedBottomInfoBox />
              </div>
            </div>
          </div>
          <Footer landing={landing} />
        </div>
      )}
    </div>
  );
}
