import { moralisProviderLocalStorageKey } from '@dehub/shared/models';
import { shortenAddress } from '@dehub/shared/utils';
import { MenuItem } from 'primereact/menuitem';
import { SplitButton } from 'primereact/splitbutton';
import { useCallback, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { useAppDispatch } from '../../states';
import { clearUserData as clearUserSpecialData } from '../../states/special-raffle';
import { clearUserData as clearUserStandardData } from '../../states/standard-raffle';
import ConnectWalletButton from '../ConnectWalletButton';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, logout, account, Moralis } = useMoralis();
  const isAuth = isAuthenticated && account;

  const doLogout = useCallback(() => {
    window.localStorage.removeItem(moralisProviderLocalStorageKey);
    logout();
    dispatch(clearUserSpecialData());
    dispatch(clearUserStandardData());
  }, [dispatch, logout]);

  useEffect(() => {
    // TODO: Ben rethink
    const unsubscribeFromWeb3Deactivated = Moralis.onWeb3Deactivated(error => {
      console.info(
        `Moralis ${error.connector.type} connector was deactivated! Logging out.`
      );
      doLogout();
    });

    return () => {
      unsubscribeFromWeb3Deactivated();
    };
  }, [Moralis, doLogout]);

  // const doLogout = () => {
  //   logout();
  //   window.localStorage.removeItem(moralisProviderLocalStorageKey);
  //   dispatch(clearUserSpecialData());
  //   dispatch(clearUserStandardData());
  // };

  const handleLogout = ({
    originalEvent,
    item,
  }: {
    originalEvent: React.SyntheticEvent;
    item: MenuItem;
  }) => {
    // unsubscribeFromWeb3Deactivated();
    doLogout();
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
        {isAuth ? (
          <SplitButton
            label={shortenAddress(account)}
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
