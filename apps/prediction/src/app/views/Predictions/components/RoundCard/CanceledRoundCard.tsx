import { BlockIcon, CardBody, Flex, Text } from '@dehub/react/pcsuikit';
import React from 'react';
import { useTranslation } from '../../../../contexts/Localization';
import { useGetTotalIntervalBlocks } from '../../../../state/hooks';
import { BetPosition, Round } from '../../../../state/types';
import useIsRefundable from '../../hooks/useIsRefundable';
import ReclaimPositionButton from '../ReclaimPositionButton';
import { RoundResultBox } from '../RoundResult';
import Card from './Card';
import CardHeader from './CardHeader';
import MultiplierArrow from './MultiplierArrow';

interface CanceledRoundCardProps {
  round: Round;
}

const CanceledRoundCard: React.FC<CanceledRoundCardProps> = ({ round }) => {
  const { t } = useTranslation();
  const interval = useGetTotalIntervalBlocks();
  const { isRefundable, setIsRefundable } = useIsRefundable(
    round.epoch as number
  );
  const { epoch, startBlock } = round;
  const estimatedEndBlock = (startBlock as number) + interval;

  const handleSuccess = async () => {
    setIsRefundable(false);
  };

  return (
    <Card>
      <CardHeader
        status="canceled"
        icon={<BlockIcon mr="4px" width="21px" />}
        title={t('Canceled')}
        epoch={round.epoch as number}
        blockNumber={estimatedEndBlock}
      />
      <CardBody p="16px">
        <MultiplierArrow isDisabled />
        <RoundResultBox>
          <Flex flexDirection="column" alignItems="center">
            <Text color={isRefundable ? 'text' : 'white'}>
              {t('Round Canceled')}
            </Text>
            {isRefundable && (
              <ReclaimPositionButton
                epoch={epoch as number}
                onSuccess={handleSuccess}
                width="100%"
                my="8px"
              />
            )}
          </Flex>
        </RoundResultBox>
        <MultiplierArrow betPosition={BetPosition.BEAR} isDisabled />
      </CardBody>
    </Card>
  );
};

export default CanceledRoundCard;
