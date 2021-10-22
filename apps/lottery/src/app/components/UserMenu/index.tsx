import { Hooks } from '@dehub/react/core';
import { shortenAddress } from '@dehub/shared/utils';

import ConnectWalletButton from '../ConnectWalletButton';

const UserMenu = () => {
  const { account, isAuthenticated, logout } = Hooks.useMoralisEthers();

  return (
    <ul className="layout-topbar-actions">
      <li>
        {isAuthenticated ? (
          <button className="landing-button p-button" onClick={() => logout()}>
            <span className="p-button-text">
              {account ? shortenAddress(account) : 'Connect Wallet'}
            </span>
          </button>
        ) : (
          <ConnectWalletButton />
        )}
      </li>
    </ul>
  );
};

export default UserMenu;
