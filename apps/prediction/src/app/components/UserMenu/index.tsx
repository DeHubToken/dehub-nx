import { moralisProviderLocalStorageKey } from '@dehub/shared/models';
import { shortenAddress } from '@dehub/shared/utils';
import { MenuItem } from 'primereact/menuitem';
import { SplitButton } from 'primereact/splitbutton';
import { useCallback, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import ConnectWalletButton from '../ConnectWalletButton';

const UserMenu = () => {
  const { isAuthenticating, logout, account, Moralis } = useMoralis();

  const doLogout = useCallback(() => {
    window.localStorage.removeItem(moralisProviderLocalStorageKey);
    logout();
  }, [logout]);

  useEffect(() => {
    const unsubscribeFromWeb3Deactivated = Moralis.onWeb3Deactivated(error => {
      if (!isAuthenticating) {
        console.info(
          `Moralis ${error.connector.type} connector was deactivated! Logging out.`
        );
        unsubscribeFromWeb3Deactivated();
        doLogout();
      }
    });

    return () => {
      unsubscribeFromWeb3Deactivated();
    };
  }, [Moralis, isAuthenticating, doLogout]);

  const handleLogout = ({
    originalEvent,
    item,
  }: {
    originalEvent: React.SyntheticEvent;
    item: MenuItem;
  }) => {
    logout();
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
