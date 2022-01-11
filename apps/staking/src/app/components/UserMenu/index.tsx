import { MenuItem } from 'primereact/menuitem';
import { SplitButton } from 'primereact/splitbutton';

import { Hooks } from '@dehub/react/core';
import { shortenAddress } from '@dehub/shared/utils';

import ConnectWalletButton from '../ConnectWalletButton';
import { useAppDispatch } from '../../state';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const { account, isAuthenticated, logout, clearProvider } =
    Hooks.useMoralisEthers();

  const handleLogout = ({
    originalEvent,
    item,
  }: {
    originalEvent: React.SyntheticEvent;
    item: MenuItem;
  }) => {
    logout();
    clearProvider();
  };
  const items: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: handleLogout,
    },
  ];
  return (
    <ul className="layout-topbar-actions">
      <li>
        {account ? (
          <SplitButton
            label={account ? shortenAddress(account) : 'Connect Wallet'}
            icon="fas fa-wallet"
            model={items}
            className="p-button-primary"
          ></SplitButton>
        ) : (
          <ConnectWalletButton />
        )}
      </li>
    </ul>
  );
};
export default UserMenu;
