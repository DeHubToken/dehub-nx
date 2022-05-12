import { MenuItem } from 'primereact/menuitem';
import { SplitButton } from 'primereact/splitbutton';
import { useMemo } from 'react';

const BuyDeHubButton = ({
  cexUrl,
  downloadWalletUrl,
  onBuyWithCard,
}: {
  cexUrl: string;
  downloadWalletUrl: string;
  onBuyWithCard: () => void;
}) => {
  const items: MenuItem[] = useMemo(
    () => [
      {
        label: 'Buy With Card',
        command: onBuyWithCard,
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
    [cexUrl, downloadWalletUrl, onBuyWithCard]
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
