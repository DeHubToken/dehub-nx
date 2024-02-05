import {
  Footer,
  Header,
  Loader,
  LoaderProps,
  Logo,
  PageMeta,
  TabMenu
} from '@dehub/react/ui';
import { WalletConnectingState } from '@dehub/shared/model';
import { decimalToHex } from '@dehub/shared/util/network/decimal-to-hex';
import { iOS } from '@dehub/shared/utils';
import { Moralis } from 'moralis-v1';
import React, { useEffect, useState } from 'react';
import { useWeb3Context } from '../../hooks';
import { useContentfulContext } from '../../hooks/useContentfulContext';
import ToastListener from '../Toast/ToastListener';
import UserMenu from '../UserMenu';

const initMessage: LoaderProps = {
  title: '',
  subtitle: '',
};

const withLayout =
  <P extends object>(
    {
      baseUrl = '/',
      landing,
      cexUrl,
      downloadMetamaskUrl,
      activeTab,
    }: {
      baseUrl?: string;
      landing: string;
      cexUrl: string;
      downloadMetamaskUrl: string;
      activeTab: string;
    },
    Component: React.ComponentType<P>
  ): React.FC<P> =>
  ({ ...props }) => {
    const [showLoader, setShowLoader] = useState(false);
    const [message, setMessage] = useState<LoaderProps>(initMessage);

    const {
      walletConnectingState,
      defaultChainId,
      // baseUrl,
      // landingUrl: landing,
      logout,
    } = useWeb3Context();

    const { footer } = useContentfulContext();

    const logo: Logo.LogoTypes = {
      href: 'https://dehub.net',
      icon: `${baseUrl}/assets/dehub/logo-dehub-white.svg`,
      alt: 'DeHub logo',
    };

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
        <PageMeta baseUrl={baseUrl} />
        <ToastListener />
        {showLoader && (
          <Loader
            {...message}
            loaderGif={`${baseUrl}/assets/dehub/dehub-loader.gif`}
          />
        )}
        <div
          className="layout-wrapper"
          style={{
            backgroundImage: `url("${baseUrl}/assets/img/back.jpg") no-repeat fixed center center /cover`,
          }}
        >
          <Header
            userMenu={
              <UserMenu
                landing={landing}
                cexUrl={cexUrl}
                downloadMetamaskUrl={downloadMetamaskUrl}
              />
            }
            logo={logo}
          />
          <div className="layout-content py-0">
            <TabMenu activeTab={activeTab} landing={landing} />
          </div>

          <div className="layout-main">
            <div className="layout-content">
              <Component {...(props as P)} />
            </div>
          </div>
          <Footer footer={footer} landing={landing} logo={logo} />
        </div>
      </div>
    );
  };

export default withLayout;
