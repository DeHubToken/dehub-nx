import { MenuItem } from 'primereact/menuitem';
import { SplitButton } from 'primereact/splitbutton';
import { useMemo } from 'react';

const BuyDeHubButton = ({
  cexUrl,
  downloadWalletUrl,
}: {
  cexUrl: string;
  downloadWalletUrl: string;
}) => {
  const items: MenuItem[] = useMemo(
    () => [
      {
        label: 'CEX',
        command: () => window.open(cexUrl, '_blank'),
      },
      {
        label: 'Download Wallet',
        command: () => window.open(downloadWalletUrl, '_blank'),
      },
    ],
    [cexUrl, downloadWalletUrl]
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
