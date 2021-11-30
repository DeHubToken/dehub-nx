import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ModalContainer,
  ModalBody,
  ModalTitle,
  ModalHeader,
  InjectedModalProps,
  Button,
  AutoRenewIcon,
  Text,
  Flex,
  Heading,
  Box,
  LinkExternal,
  ModalCloseButton,
} from '@dehub/react/pcsuikit';
import { Hooks } from '@dehub/react/core';
import Icon from '../../../components/Icon/Icon';
import { useAppDispatch } from '../../../state';
import { usePriceBnbBusd } from '../../../state/hooks';
import { markBetAsCollected } from '../../../state/predictions';
import { useTranslation } from '../../../contexts/Localization';
import useToast from '../../../hooks/useToast';
import { usePredictionsContract } from '../../../hooks/useContract';
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

const BunnyDecoration = styled.div`
  position: absolute;
  top: -116px; // line up bunny at the top of the modal
  left: 0px;
  text-align: center;
  width: 100%;
`;

const CollectRoundWinningsModal: React.FC<CollectRoundWinningsModalProps> = ({
  payout,
  roundId,
  epoch,
  onDismiss,
  onSuccess,
}) => {
  const [isPendingTx, setIsPendingTx] = useState(false);
  const { account } = Hooks.useMoralisEthers();
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();
  const predictionsContract = usePredictionsContract();
  const bnbBusdPrice = usePriceBnbBusd();
  const dispatch = useAppDispatch();

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
      toastError(t('Error'), error?.message);
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
        <Icon
          className="fad fa-trophy-alt pr-2"
          size="86px"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '10px',
            marginBottom: '44px',
            color: '#FFD800',
          }}
        ></Icon>
        <Flex alignItems="start" justifyContent="space-between" mb="24px">
          <Text>{t('Collecting')}</Text>
          <Box style={{ textAlign: 'right' }}>
            <Text>{`${payout ? formatDehub(payout) : 0} DEHUB`}</Text>
            <Text fontSize="12px" color="textSubtle">
              {`~$${
                payout ? formatDehub(bnbBusdPrice.times(payout).toNumber()) : 0
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
