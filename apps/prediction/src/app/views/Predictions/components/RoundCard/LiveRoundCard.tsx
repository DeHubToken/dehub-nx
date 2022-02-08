import {
  CardBody,
  Flex,
  PlayCircleOutlineIcon,
  Skeleton,
  Text,
  TooltipText,
  useTooltip,
} from '@dehub/react/pcsuikit';
import React, { useEffect } from 'react';
import { useCountUp } from 'react-countup';
import BlockProgress from '../../../../components/BlockProgress';
import { useTranslation } from '../../../../contexts/Localization';
import {
  useBlock,
  useGetIntervalBlocks,
  useGetLastOraclePrice,
} from '../../../../state/hooks';
import { BetPosition, Round } from '../../../../state/types';
import { formatUsd } from '../../helpers';
import PositionTag from '../PositionTag';
import { LockPriceRow, PrizePoolRow, RoundResultBox } from '../RoundResult';
import CalculatingCard from './CalculatingCard';
import CanceledRoundCard from './CanceledRoundCard';
import Card from './Card';
import CardHeader from './CardHeader';
import MultiplierArrow from './MultiplierArrow';

interface LiveRoundCardProps {
  round: Round;
  betAmount?: number;
  hasEnteredUp: boolean;
  hasEnteredDown: boolean;
  bullMultiplier: number;
  bearMultiplier: number;
}

const LiveRoundCard: React.FC<LiveRoundCardProps> = ({
  round,
  betAmount,
  hasEnteredUp,
  hasEnteredDown,
  bullMultiplier,
  bearMultiplier,
}) => {
  const { t } = useTranslation();
  const { lockPrice, lockBlock, totalAmount } = round;
  const { currentBlock } = useBlock();
  const totalInterval = useGetIntervalBlocks();
  const price = useGetLastOraclePrice();
  const isBull = price.gt(lockPrice);
  const priceColor = isBull ? 'success' : 'failure';
  const estimatedEndBlock = (lockBlock as number) + totalInterval;
  const priceDifference = price.minus(lockPrice).toNumber();
  const { countUp, update } = useCountUp({
    start: 0,
    end: price.toNumber(),
    duration: 1,
    decimals: 3,
  });
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Last price from Chainlink Oracle'),
    {
      placement: 'bottom',
    }
  );

  useEffect(() => {
    update(price.toNumber());
  }, [price, update]);

  if (round.failed) {
    return <CanceledRoundCard round={round} />;
  }

  if (currentBlock > estimatedEndBlock) {
    return <CalculatingCard round={round} />;
  }

  return (
    <>
      <Card className="border-neon-2">
        <CardHeader
          status="live"
          icon={<PlayCircleOutlineIcon mr="4px" width="24px" color="white" />}
          title={t('Live')}
          epoch={round.epoch as number}
          blockNumber={estimatedEndBlock}
        />
        <BlockProgress
          variant="flat"
          scale="sm"
          startBlock={lockBlock as number}
          endBlock={estimatedEndBlock}
        />
        <CardBody p="16px">
          <MultiplierArrow
            betAmount={betAmount}
            multiplier={bullMultiplier}
            hasEntered={hasEnteredUp}
            isActive={isBull}
          />
          <RoundResultBox
            betPosition={isBull ? BetPosition.BULL : BetPosition.BEAR}
          >
            <Text
              color="textSubtle"
              fontSize="12px"
              bold
              textTransform="uppercase"
              mb="8px"
            >
              {t('Last Price')}
            </Text>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              mb="16px"
              height="36px"
            >
              <div ref={targetRef}>
                <TooltipText
                  bold
                  color={priceColor}
                  fontSize="24px"
                  style={{ minHeight: '36px' }}
                >
                  {price.gt(0) ? (
                    `$${countUp}`
                  ) : (
                    <Skeleton height="36px" width="94px" />
                  )}
                </TooltipText>
              </div>
              <PositionTag
                betPosition={isBull ? BetPosition.BULL : BetPosition.BEAR}
              >
                {formatUsd(priceDifference)}
              </PositionTag>
            </Flex>
            {lockPrice && <LockPriceRow lockPrice={lockPrice} />}
            <PrizePoolRow totalAmount={totalAmount} />
          </RoundResultBox>
          <MultiplierArrow
            betAmount={betAmount}
            multiplier={bearMultiplier}
            betPosition={BetPosition.BEAR}
            hasEntered={hasEnteredDown}
            isActive={!isBull}
          />
        </CardBody>
      </Card>
      {tooltipVisible && tooltip}
    </>
  );
};

export default LiveRoundCard;
