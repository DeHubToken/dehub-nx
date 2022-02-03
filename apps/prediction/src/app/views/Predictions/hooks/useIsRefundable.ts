import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { usePredictionsContract } from '../../../hooks/useContract';

const useIsRefundable = (epoch: number) => {
  const [isRefundable, setIsRefundable] = useState(false);
  const predictionsContract = usePredictionsContract();
  const { account } = useMoralis();

  useEffect(() => {
    const fetchRefundableStatus = async () => {
      const canClaim = await predictionsContract?.claimable(epoch, account);

      if (predictionsContract && canClaim) {
        const refundable = await predictionsContract.refundable(epoch, account);
        setIsRefundable(refundable);
      } else {
        setIsRefundable(false);
      }
    };

    if (account && predictionsContract) {
      fetchRefundableStatus();
    }
  }, [account, epoch, predictionsContract, setIsRefundable]);

  return { isRefundable, setIsRefundable };
};

export default useIsRefundable;
