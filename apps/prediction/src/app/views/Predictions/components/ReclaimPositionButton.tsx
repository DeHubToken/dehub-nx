import React, { ReactNode, useState } from 'react';
import { Hooks } from '@dehub/react/core';
import { AutoRenewIcon, Button, ButtonProps } from '@dehub/react/pcsuikit';
import { useTranslation } from '../../../contexts/Localization';
import { usePredictionsContract } from '../../../hooks/useContract';
import useToast from '../../../hooks/useToast';

interface ReclaimPositionButtonProps extends ButtonProps {
  epoch: number;
  onSuccess?: () => Promise<void>;
  children?: ReactNode;
}

const ReclaimPositionButton: React.FC<ReclaimPositionButtonProps> = ({
  epoch,
  onSuccess,
  children,
  ...props
}) => {
  const [isPendingTx, setIsPendingTx] = useState(false);
  const { t } = useTranslation();
  const { account } = Hooks.useMoralisEthers();
  const predictionsContract = usePredictionsContract();
  const { toastSuccess, toastError } = useToast();

  const handleReclaim = async () => {
    try {
      const tx = await predictionsContract.claim(epoch, { from: account })
      setIsPendingTx(true);
      const result = tx.wait()
      if (onSuccess) {
        await onSuccess();
      }
      setIsPendingTx(false);
      toastSuccess(t('Position reclaimed!'));

    } catch (error) {
      setIsPendingTx(false);
      toastError(t('Error'), error?.message);
      console.error(error);
    }
  };

  return (
    <Button
      onClick={handleReclaim}
      isLoading={isPendingTx}
      endIcon={isPendingTx ? <AutoRenewIcon spin color="white" /> : null}
      {...props}
    >
      {children || t('Reclaim Position')}
    </Button>
  );
};

export default ReclaimPositionButton;
