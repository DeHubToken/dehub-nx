import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Layout/Card';
import DeGrand from '../views/DeGrand';
import DeLotto from '../views/DeLotto';

import Loader from '../components/Loader';
import { WalletConnectingState } from '../constants';
import { useWalletConnectingState } from '../state/application/hooks';

export default function Lottery() {
  const [showLoader, setShowLoader] = useState(false);
  const walletConnectingState = useWalletConnectingState(); 

  useEffect(() => {
    if (walletConnectingState === WalletConnectingState.WAITING) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [walletConnectingState])

  return (
    <div>
      {showLoader ? <Loader /> :
        <div className="layout-wrapper">
          <Header />
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
      }
    </div>
  )
}