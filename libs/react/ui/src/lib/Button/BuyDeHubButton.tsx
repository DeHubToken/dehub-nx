import { getBuyDehubMenuItems } from '@dehub/shared/utils';
import { SplitButton } from 'primereact/splitbutton';

const BuyDeHubButton = ({
  landing,
  cexUrl,
  downloadMetamaskUrl,
}: {
  landing: string;
  cexUrl: string;
  downloadMetamaskUrl: string;
}) => {
  const items = getBuyDehubMenuItems(landing, cexUrl, downloadMetamaskUrl);
  const directLink = items[0];

  return (
    <SplitButton
      label="Buy DHB"
      model={items}
      icon={directLink.icon}
      onClick={directLink.command}
    ></SplitButton>
  );
};

export default BuyDeHubButton;
