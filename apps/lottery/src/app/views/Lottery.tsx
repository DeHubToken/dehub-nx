import { useState, useEffect } from 'react';
import Card from '../components/Layout/Card';
import DeGrand from '../views/DeGrand';
import DeLotto from '../views/DeLotto';

import { WalletConnectingState } from '@dehub/shared/config';
import {
  Components,
  States
} from '@dehub/shared/react';

export default function Lottery() {
  const [showLoader, setShowLoader] = useState(false);
  const walletConnectingState = States.Application.Hooks.useWalletConnectingState(); 

  useEffect(() => {
    if (walletConnectingState === WalletConnectingState.WAITING) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [walletConnectingState])

  return (
    <div>
      {showLoader ? <Components.Loader /> :
        <div className="layout-wrapper">
          <Components.Header />
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
          <Components.Footer />
        </div>
      }
    </div>
  )
}