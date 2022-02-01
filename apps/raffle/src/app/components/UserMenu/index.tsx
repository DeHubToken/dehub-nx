import { shortenAddress } from '@dehub/shared/utils';
import { MenuItem } from 'primereact/menuitem';
import { SplitButton } from 'primereact/splitbutton';
import { useMoralis } from 'react-moralis';
import { useAppDispatch } from '../../states';
import { clearUserData as clearUserSpecialData } from '../../states/special-raffle';
import { clearUserData as clearUserStandardData } from '../../states/standard-raffle';
import ConnectWalletButton from '../ConnectWalletButton';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, logout, account } = useMoralis();

  // const user = isAuthenticated && Moralis.User.current();
  // const account = user && user.get('ethAddress');

  const handleLogout = ({
    originalEvent,
    item,
  }: {
    originalEvent: React.SyntheticEvent;
    item: MenuItem;
  }) => {
    logout();
    dispatch(clearUserSpecialData());
    dispatch(clearUserStandardData());
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
        {isAuthenticated ? (
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
