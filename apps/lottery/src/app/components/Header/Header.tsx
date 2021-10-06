import { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMoralis } from 'react-moralis';

import { shortenAddress } from '@dehub/shared/config';

import { Text } from '../Text';
import WalletModal from '../WalletModal';
import { useMoralisEthers } from '../../hooks';
import { useWalletModalToggle } from '../../state/application/hooks';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const history = useHistory();

  const toggleWalletModal = useWalletModalToggle();
  const moralisContext = useMoralisEthers();

  const [signerAddress, setSignerAddress] = useState<string>("Connect Wallet");

  useEffect(() => {
    const fetchSignerAddress = async () => {
      if (moralisContext?.authProvider) {
        const signer = moralisContext?.authProvider.getSigner();
        setSignerAddress(shortenAddress((await signer.getAddress())));
      } else {
        setSignerAddress("Connect Wallet");
      }
    };

    fetchSignerAddress();
  }, [moralisContext?.authProvider])

  // const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  // useEffect(() => {
  //   setAuthenticated(moralisContext?.isAuthenticated ?? false);
  // }, [moralisContext?.isAuthenticated]);

  const {
    authError,
    isAuthenticated,
    logout
  } = useMoralis();

  return (
    <div className="layout-topbar-dark">
      <div className="layout-topbar">
        <div className="layout-topbar-wrapper">
          <div className="layout-topbar-left">
            <button className="p-link layout-topbar-logo" onClick={() => history.push('/')}>
              <img src="assets/dehub/logo.png" alt="DeHUB logo" />
            </button>
          </div>

          <div className="layout-topbar-right">
            {
              authError ? <Text>Wrong Network</Text> : <></>
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
            <WalletModal />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Header)