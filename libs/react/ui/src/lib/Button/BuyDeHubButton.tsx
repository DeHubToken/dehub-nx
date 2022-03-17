import { MenuItem } from 'primereact/menuitem';
import { SplitButton } from 'primereact/splitbutton';
import { useMemo } from 'react';

const BuyDeHubButton = ({
  cexUrl,
  downloadWalletUrl,
  onBuy,
  onDexSelected,
}: {
  cexUrl: string;
  downloadWalletUrl: string;
  onBuy: () => void;
  onDexSelected: () => void;
}) => {
  const items: MenuItem[] = useMemo(
    () => [
      {
        label: 'DEX',
        command: onDexSelected,
      },
      {
        label: 'CEX',
        command: () => window.open(cexUrl, '_blank'),
      },
      {
        label: 'Download Wallet',
        command: () => window.open(downloadWalletUrl, '_blank'),
      },
    ],
    [cexUrl, downloadWalletUrl, onDexSelected]
  );

  return (
    <SplitButton
      className="p-button-primary"
      label="Buy DeHub"
      model={items}
    ></SplitButton>
  );
};

export default BuyDeHubButton;
