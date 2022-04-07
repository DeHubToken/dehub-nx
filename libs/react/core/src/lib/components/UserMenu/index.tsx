import { BuyDeHubButton, BuyDeHubFloozModal } from '@dehub/react/ui';
import { moralisProviderLocalStorageKey } from '@dehub/shared/model';
import { shortenAddress } from '@dehub/shared/utils';
import { MenuItem } from 'primereact/menuitem';
import { SplitButton } from 'primereact/splitbutton';
import { useCallback, useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import ConnectWalletButton from '../ConnectWalletButton';

const UserMenu = ({
  cexUrl,
  downloadWalletUrl,
}: {
  cexUrl: string;
  downloadWalletUrl: string;
}) => {
  const { isAuthenticating, logout, account, Moralis } = useMoralis();
  const [buyDeHubFloozModalOpen, setBuyDeHubFloozModal] = useState(false);

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
    doLogout();
  };

  const items: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: handleLogout,
    },
  ];

  const handleDexSelected = () => {
    setBuyDeHubFloozModal(true);
  };

  return (
    <>
      <ul className="layout-topbar-actions">
        <li className="topbar-item">
          <BuyDeHubButton
            cexUrl={cexUrl}
            downloadWalletUrl={downloadWalletUrl}
            onBuy={handleDexSelected}
            onDexSelected={handleDexSelected}
          />
        </li>
        <li className="topbar-item ml-4">
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
      <BuyDeHubFloozModal
        visible={buyDeHubFloozModalOpen}
        onDismiss={() => {
          setBuyDeHubFloozModal(false);
        }}
      />
    </>
  );
};
export default UserMenu;
