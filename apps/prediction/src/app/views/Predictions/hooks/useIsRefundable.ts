import { useEffect, useState } from 'react';
import { Hooks } from '@dehub/react/core';
import { usePredictionsContract } from '../../../hooks/useContract';

const useIsRefundable = (epoch: number) => {
  const [isRefundable, setIsRefundable] = useState(false);
  const predictionsContract = usePredictionsContract();
  const { account } = Hooks.useMoralisEthers();

  useEffect(() => {
    const fetchRefundableStatus = async () => {
      const canClaim = await predictionsContract.methods
        .claimable(epoch, account)
        .call();

      if (canClaim) {
        const refundable = await predictionsContract.methods
          .refundable(epoch, account)
          .call();
        setIsRefundable(refundable);
      } else {
        setIsRefundable(false);
      }
    };

    if (account) {
      fetchRefundableStatus();
    }
  }, [account, epoch, predictionsContract, setIsRefundable]);

  return { isRefundable, setIsRefundable };
};

export default useIsRefundable;
