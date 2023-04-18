import { BuyDeHubButton } from '@dehub/react/ui';
import { shortenAddress } from '@dehub/shared/utils';
import Moralis from 'moralis';
import { MenuItem } from 'primereact/menuitem';
import { SplitButton } from 'primereact/splitbutton';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { useWeb3Context } from '../../hooks';
import ConnectWalletButton from '../ConnectWalletButton';

const UserMenu = ({
  landing,
  cexUrl,
  downloadMetamaskUrl,
}: {
  landing: string;
  cexUrl: string;
  downloadMetamaskUrl: string;
}) => {
  const { account, logout } = useWeb3Context();

  const { isAuthenticating } = useMoralis();

  useEffect(() => {
    const unsubscribeFromWeb3Deactivated = Moralis.onAccountChanged(account => {
      if (!account) {
        console.info(`Moralis all accounts are disconnected! Logging out.`);
        unsubscribeFromWeb3Deactivated();
        logout();
      }
    });

    return () => {
      unsubscribeFromWeb3Deactivated();
    };
  }, [isAuthenticating, logout]);

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
      <li className="topbar-item">
        <BuyDeHubButton
          landing={landing}
          cexUrl={cexUrl}
          downloadMetamaskUrl={downloadMetamaskUrl}
        />
      </li>
      <li className="topbar-item ml-2 md:ml-4">
        {account ? (
          <SplitButton
            className="p-button-primary"
            icon="fas fa-wallet"
            label={account ? shortenAddress(account) : 'Connect Wallet'}
            model={items}
          ></SplitButton>
        ) : (
          <ConnectWalletButton />
        )}
      </li>
    </ul>
  );
};
export default UserMenu;
