import { getBuyDehubMenuItems } from '@dehub/shared/utils';
import { SplitButton } from 'primereact/splitbutton';

const BuyDeHubButton = ({
  landing,
  cexUrl,
  downloadMetamaskUrl,
  onSwap,
}: {
  landing: string;
  cexUrl: string;
  downloadMetamaskUrl: string;
  onSwap: () => void;
}) => {
  const items = getBuyDehubMenuItems(
    landing,
    cexUrl,
    downloadMetamaskUrl,
    onSwap
  );
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
