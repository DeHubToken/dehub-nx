import { Footer, Header, Loader, PageMeta, TabMenu } from '@dehub/react/ui';
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
  <P extends object>(
    {
      baseUrl = '/',
      pageTitle = 'DeHub D’App',
      cexUrl = 'https://www.gate.io/trade/DEHUB_USDT',
      downloadWalletUrl = 'https://metamask.io/download/',
      landing = 'https://dehub.net',
      activeTab,
    }: {
      baseUrl?: string;
      pageTitle?: string;
      cexUrl?: string;
      downloadWalletUrl?: string;
      landing?: string;
      activeTab: string;
    },
    Component: React.ComponentType<P>
  ): React.FC<P> =>
  ({ ...props }) => {
    const [showLoader, setShowLoader] = useState(false);
    const [message, setMessage] = useState(initMessage);

    const { logout } = useMoralis();
    const {
      walletConnectingState,
      defaultChainId,
      // baseUrl,
      // pageTitle,
      // landingUrl: landing,
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
              backgroundImage: `url("${baseUrl}/assets/img/back.jpg") no-repeat fixed center center /cover`,
            }}
          >
            <Header
              userMenu={
                <UserMenu
                  cexUrl={cexUrl}
                  downloadWalletUrl={downloadWalletUrl}
                />
              }
              logo={{
                href: 'https://dehub.net',
                icon: `${baseUrl}/assets/dehub/logo-dehub-white.svg`,
              }}
            />
            <div className="layout-content py-0">
              <TabMenu activeTab={activeTab} />
            </div>

            <div className="layout-main">
              <div className="layout-content">
                <Component {...(props as P)} />
              </div>
            </div>
            <Footer landing={landing} />
          </div>
        )}
      </div>
    );
  };

export default withLayout;
