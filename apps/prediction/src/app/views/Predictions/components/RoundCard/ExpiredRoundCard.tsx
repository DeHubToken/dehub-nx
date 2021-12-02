import React from 'react';
import styled from 'styled-components';
import { Hooks } from '@dehub/react/core';
import { Box, BlockIcon, CardBody } from '@dehub/react/pcsuikit';
import { useTranslation } from '../../../../contexts/Localization';
import { Round, BetPosition } from '../../../../state/types';
import {
  useGetBetByRoundId,
  useRewardRate,
  useTotalRate,
} from '../../../../state/hooks';
import { RoundResult } from '../RoundResult';
import { getPayout } from '../../helpers';
import MultiplierArrow from './MultiplierArrow';
import Card from './Card';
import CardHeader from './CardHeader';
import CollectWinningsOverlay from './CollectWinningsOverlay';
import CanceledRoundCard from './CanceledRoundCard';

interface ExpiredRoundCardProps {
  round: Round;
  betAmount?: number;
  hasEnteredUp: boolean;
  hasEnteredDown: boolean;
  bullMultiplier: number;
  bearMultiplier: number;
}

const StyledExpiredRoundCard = styled(Card)`
  opacity: 0.7;
  transition: opacity 300ms;
  border: 2px solid rgb(41 50 65);
  background: linear-gradient(
    128deg,
    #0b1113 0%,
    rgba(26, 50, 63, 0.8) 25%,
    rgba(50, 19, 56, 0.8) 100%
  );
  &:hover {
    opacity: 1;
  }
`;

const ExpiredRoundCard: React.FC<ExpiredRoundCardProps> = ({
  round,
  betAmount,
  hasEnteredUp,
  hasEnteredDown,
  bullMultiplier,
  bearMultiplier,
}) => {
  const { t } = useTranslation();
  const { account } = Hooks.useMoralisEthers();
  const rewardRate = useRewardRate();
  const totalRate = useTotalRate();
  const { id, epoch, endBlock, lockPrice, closePrice } = round;
  const betPosition =
    closePrice > lockPrice ? BetPosition.BULL : BetPosition.BEAR;
  const bet = useGetBetByRoundId(account, round.id);
  const payout = bet ? getPayout(bet) : null;

  if (round.failed) {
    return <CanceledRoundCard round={round} />;
  }

  return (
    <Box position="relative">
      <StyledExpiredRoundCard>
        <CardHeader
          status="expired"
          icon={<BlockIcon mr="4px" width="21px" color="white" />}
          title={t('Expired')}
          blockNumber={endBlock as number}
          epoch={round.epoch as number}
        />
        <CardBody p="16px" style={{ position: 'relative' }}>
          <MultiplierArrow
            betAmount={betAmount}
            multiplier={bullMultiplier}
            isActive={betPosition === BetPosition.BULL}
            hasEntered={hasEnteredUp}
          />
          <RoundResult round={round} />
          <MultiplierArrow
            betAmount={betAmount}
            multiplier={bearMultiplier}
            betPosition={BetPosition.BEAR}
            isActive={betPosition === BetPosition.BEAR}
            hasEntered={hasEnteredDown}
          />
        </CardBody>
      </StyledExpiredRoundCard>
      <CollectWinningsOverlay
        roundId={id}
        epoch={epoch as number}
        payout={payout}
        isBottom={hasEnteredDown}
      />
    </Box>
  );
};

export default ExpiredRoundCard;
