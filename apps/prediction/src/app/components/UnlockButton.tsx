import { Button, useWalletModal, ButtonProps } from '@pancakeswap/uikit';
import useAuth from '../hooks/useAuth';
import { useTranslation } from '../contexts/Localization';

const UnlockButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      {t('Unlock Wallet')}
    </Button>
  );
};

export default UnlockButton;
