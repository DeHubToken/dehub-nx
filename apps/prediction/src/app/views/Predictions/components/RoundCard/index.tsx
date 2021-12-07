import React from 'react';
import { Hooks } from '@dehub/react/core';
import {
  useGetBetByRoundId,
  useGetCurrentEpoch,
} from '../../../../state/hooks';
import { BetPosition, Round } from '../../../../state/types';
import { getMultiplier } from '../../helpers';
import ExpiredRoundCard from './ExpiredRoundCard';
import LiveRoundCard from './LiveRoundCard';
import OpenRoundCard from './OpenRoundCard';
import SoonRoundCard from './SoonRoundCard';

interface RoundCardProps {
  round: Round;
}

const RoundCard: React.FC<RoundCardProps> = ({ round }) => {
  const {
    id,
    epoch,
    lockPrice,
    closePrice,
    totalAmount,
    bullAmount,
    bearAmount,
  } = round;
  const currentEpoch = useGetCurrentEpoch();
  const { account } = Hooks.useMoralisEthers();
  const bet = useGetBetByRoundId(account, id);
  const hasEntered = bet !== null;
  const hasEnteredUp = hasEntered && bet?.position === BetPosition.BULL;
  const hasEnteredDown = hasEntered && bet?.position === BetPosition.BEAR;
  const bullMultiplier = getMultiplier(
    totalAmount as number,
    bullAmount as number
  );
  const bearMultiplier = getMultiplier(
    totalAmount as number,
    bearAmount as number
  );

  // Next (open) round
  if (epoch === currentEpoch && lockPrice === 0) {
    return (
      <OpenRoundCard
        round={round}
        hasEnteredDown={hasEnteredDown}
        hasEnteredUp={hasEnteredUp}
        betAmount={bet?.amount}
        bullMultiplier={bullMultiplier}
        bearMultiplier={bearMultiplier}
      />
    );
  }

  // Live round
  if (closePrice === 0 && epoch === currentEpoch - 1) {
    return (
      <LiveRoundCard
        betAmount={bet?.amount}
        hasEnteredDown={hasEnteredDown}
        hasEnteredUp={hasEnteredUp}
        round={round}
        bullMultiplier={bullMultiplier}
        bearMultiplier={bearMultiplier}
      />
    );
  }

  // Fake future rounds
  if ((epoch as number) > currentEpoch) {
    return <SoonRoundCard round={round} />;
  }

  // Past rounds
  return (
    <ExpiredRoundCard
      round={round}
      hasEnteredDown={hasEnteredDown}
      hasEnteredUp={hasEnteredUp}
      betAmount={bet?.amount}
      bullMultiplier={bullMultiplier}
      bearMultiplier={bearMultiplier}
    />
  );
};

export default RoundCard;
