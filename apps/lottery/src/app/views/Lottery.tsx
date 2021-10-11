import { Footer, Header, Loader } from '@dehub/react/ui';
import { WalletConnectingState } from '@dehub/shared/config';
import { useEffect, useState } from 'react';
import Card from '../components/Layout/Card';
import UserMenu from '../components/UserMenu';
import { useWalletConnectingState } from '../states/application/hooks';
import DeGrand from '../views/DeGrand';
import DeLotto from '../views/DeLotto';

export default function Lottery() {
  const [showLoader, setShowLoader] = useState(false);
  const walletConnectingState = useWalletConnectingState();

  useEffect(() => {
    if (walletConnectingState === WalletConnectingState.WAITING) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [walletConnectingState]);

  return (
    <div>
      {showLoader ? (
        <Loader />
      ) : (
        <div className="layout-wrapper">
          <Header
            userMenu={<UserMenu />}
            logo={{
              href: 'https://dehub.net',
              icon: 'assets/dehub/logo-dehub-white.svg',
            }}
          />
          <div className="layout-main">
            <div className="layout-content">
              <Card
                className="mx-auto text-center"
                style={{ width: '300px', height: '100px' }}
              >
                <h1>Lottery LOGO</h1>
              </Card>
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
