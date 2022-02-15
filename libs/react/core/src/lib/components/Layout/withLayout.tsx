import { Footer, Header, Loader, PageMeta } from '@dehub/react/ui';
import { WalletConnectingState } from '@dehub/shared/model';
import { decimalToHex, iOS } from '@dehub/shared/util';
import { Moralis } from 'moralis';
import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useConnectContext } from '../../hooks';
import UserMenu from '../UserMenu';

const initMessage = {
  title: '',
  subtitle: '',
};

const withLayout =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
  ({ ...props }) => {
    const [showLoader, setShowLoader] = useState(false);
    const [message, setMessage] = useState(initMessage);

    const { logout } = useMoralis();
    const {
      walletConnectingState,
      defaultChainId,
      baseUrl,
      pageTitle,
      landingUrl,
    } = useConnectContext();

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
      Moralis.onChainChanged(newChainId => {
        if (newChainId !== decimalToHex(defaultChainId)) {
          logout();
        }
      });
    }, [logout, defaultChainId]);

    useEffect(() => {
      if (walletConnectingState === WalletConnectingState.WAITING) {
        setShowLoader(true);
        setMessage({
          title: 'Waiting',
          subtitle: 'Please confirm with your wallet.',
        });
      } else if (
        walletConnectingState === WalletConnectingState.SWITCH_NETWORK
      ) {
        setShowLoader(true);
        setMessage({
          title: 'Waiting',
          subtitle: 'Please confirm network switch with your wallet.',
        });
      } else if (walletConnectingState === WalletConnectingState.ADD_NETWORK) {
        setShowLoader(true);
        setMessage({
          title: 'Waiting',
          subtitle: 'Please confirm network add with your wallet.',
        });
      } else {
        setShowLoader(false);
        setMessage(initMessage);
      }
    }, [walletConnectingState]);

    return (
      <div>
        <PageMeta baseUrl={baseUrl} title={pageTitle} />
        {showLoader ? (
          <Loader {...message} />
        ) : (
          <div
            className="layout-wrapper"
            style={{
              background: `linear-gradient(45deg, rgba(11, 17, 19, 0.95), rgba(5, 17, 24, 0.9) 46%, rgba(6, 12, 29, 0.8) 71%, rgba(50, 19, 56, 0.95)), url("${baseUrl}/assets/img/back.jpg") no-repeat fixed center center /cover`,
            }}
          >
            <Header
              userMenu={<UserMenu />}
              logo={{
                href: 'https://dehub.net',
                icon: `${baseUrl}/assets/dehub/logo-dehub-white.svg`,
              }}
            />
            <div className="layout-main">
              <div className="layout-content">
                <Component {...(props as P)} />
              </div>
            </div>
            <Footer landing={landingUrl} />
          </div>
        )}
      </div>
    );
  };

export default withLayout;
