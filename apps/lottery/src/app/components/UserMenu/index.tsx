import { useEffect, useState, useCallback } from 'react';

import { Hooks } from '@dehub/react/core';
import { shortenAddress } from '@dehub/shared/utils';

import ConnectWalletButton from '../ConnectWalletButton';

const UserMenu = () => {
  const { account, isAuthenticated, logout } = Hooks.useMoralisEthers();
  const [signerAddress, setSignerAddress] = useState<string>('Connect Wallet');

  useEffect(() => {
    if (account) {
      setSignerAddress(shortenAddress(account));
    } else {
      setSignerAddress('Connect Wallet');
    }
  }, [account]);

  return (
    <ul className="layout-topbar-actions">
      <li>
        {isAuthenticated ? (
          <button className="landing-button p-button" onClick={() => logout()}>
            <span className="p-button-text">{signerAddress}</span>
          </button>
        ) : (
          <ConnectWalletButton />
        )}
      </li>
    </ul>
  );
};

export default UserMenu;
