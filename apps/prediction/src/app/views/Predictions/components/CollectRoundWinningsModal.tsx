import {
  AutoRenewIcon,
  Box,
  Button,
  Flex,
  Heading,
  InjectedModalProps,
  LinkExternal,
  ModalBody,
  ModalCloseButton,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  Text,
} from '@dehub/react/pcsuikit';
import {
  BUSD_DECIMALS,
  BUSD_DISPLAY_DECIMALS,
  DEHUB_DECIMALS,
} from '@dehub/shared/config';
import { getDecimalAmount, getFullDisplayBalance } from '@dehub/shared/utils';
import { faTrophyAlt } from '@fortawesome/pro-duotone-svg-icons';
import BigNumber from 'bignumber.js';
import React, { useState } from 'react';
import { useMoralis } from 'react-moralis';
import styled from 'styled-components';
import { useTranslation } from '../../../contexts/Localization';
import { usePredictionsContract } from '../../../hooks/useContract';
import useTheme from '../../../hooks/useTheme';
import useToast from '../../../hooks/useToast';
import { useAppDispatch } from '../../../state';
import { useDehubBusdPrice } from '../../../state/application/hooks';
import { useRewardRate, useTotalRate } from '../../../state/hooks';
import { markBetAsCollected } from '../../../state/predictions';
import DuotoneFontAwesomeIcon from '../../Predictions/components/DuotoneFontAwesomeIcon';
import { formatDehub } from '../helpers';

interface CollectRoundWinningsModalProps extends InjectedModalProps {
  payout: number | null;
  roundId: string;
  epoch: number;
  onSuccess?: () => Promise<void>;
}

interface TransactionResult {
  transactionHash?: string;
}

const Modal = styled(ModalContainer)`
  overflow: visible;
`;

const CollectRoundWinningsModal: React.FC<CollectRoundWinningsModalProps> = ({
  payout,
  roundId,
  epoch,
  onDismiss,
  onSuccess,
}) => {
  const [isPendingTx, setIsPendingTx] = useState(false);
  const { account } = useMoralis();
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();
  const predictionsContract = usePredictionsContract();
  const dehubPrice = useDehubBusdPrice();
  const dispatch = useAppDispatch();
  const rewardRate = useRewardRate();
  const totalRate = useTotalRate();
  const { theme } = useTheme();

  const handleClick = async () => {
    try {
      const tx = await predictionsContract.claim(epoch);
      setIsPendingTx(true);
      const result = await tx.wait();
      if (onSuccess) {
        await onSuccess();
      }

      dispatch(markBetAsCollected({ account, roundId }));

      if (onDismiss) {
        onDismiss();
      }

      toastSuccess(
        t('Winnings collected!'),
        <Box>
          <Text as="p" mb="8px">
            {t('Your prizes have been sent to your wallet')}
          </Text>
          {result.transactionHash && (
            <LinkExternal
              href={`https://bscscan.com/tx/${result.transactionHash}`}
            >
              {t('View on BscScan')}
            </LinkExternal>
          )}
        </Box>
      );
    } catch (error) {
      setIsPendingTx(false);
      if (error instanceof Error) toastError(t('Error'), error?.message);
      console.error(error);
    }
  };

  return (
    <Modal minWidth="288px" position="relative" mt="124px">
      <ModalHeader>
        <ModalTitle>
          <Heading style={{ margin: 0 }}>{t('Collect Winnings')}</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody p="24px">
        <DuotoneFontAwesomeIcon
          icon={faTrophyAlt}
          primaryColor="#FFD800"
          primaryOpacity="1"
          secondaryColor={theme.colors.secondary}
          secondaryOpacity="1"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '10px',
            marginBottom: '44px',
            fontSize: '86px',
          }}
        />
        <Flex alignItems="start" justifyContent="space-between" mb="24px">
          <Text>{t('Collecting')}</Text>
          <Box style={{ textAlign: 'right' }}>
            <Text>{`${
              payout ? formatDehub((payout * rewardRate) / totalRate) : 0
            } DEHUB`}</Text>
            <Text fontSize="12px" color="textSubtle">
              {`~$${
                payout
                  ? getFullDisplayBalance(
                      dehubPrice.times(
                        getDecimalAmount(
                          new BigNumber((payout * rewardRate) / totalRate),
                          DEHUB_DECIMALS
                        )
                      ),
                      BUSD_DECIMALS,
                      BUSD_DISPLAY_DECIMALS
                    )
                  : 0
              }`}
            </Text>
          </Box>
        </Flex>
        <Button
          width="100%"
          mb="8px"
          onClick={handleClick}
          isLoading={isPendingTx}
          endIcon={
            isPendingTx ? <AutoRenewIcon spin color="currentColor" /> : null
          }
        >
          {t('Confirm')}
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default CollectRoundWinningsModal;
