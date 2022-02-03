import {
  ArrowDownIcon,
  ArrowUpIcon,
  Button,
  CardBody,
  PlayCircleOutlineIcon,
  useTooltip,
} from '@dehub/react/pcsuikit';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useTranslation } from '../../../../contexts/Localization';
import useToast from '../../../../hooks/useToast';
import { useAppDispatch } from '../../../../state';
import { useBlock, useGetIntervalBlocks } from '../../../../state/hooks';
import { markPositionAsEntered } from '../../../../state/predictions';
import { BetPosition, Round } from '../../../../state/types';
import { formatDehub, getDehubAmount } from '../../helpers';
import CardFlip from '../CardFlip';
import { PrizePoolRow, RoundResultBox } from '../RoundResult';
import Card from './Card';
import CardHeader from './CardHeader';
import MultiplierArrow from './MultiplierArrow';
import SetPositionCard from './SetPositionCard';

interface OpenRoundCardProps {
  round: Round;
  betAmount?: number;
  hasEnteredUp: boolean;
  hasEnteredDown: boolean;
  bullMultiplier: number;
  bearMultiplier: number;
}

interface State {
  isSettingPosition: boolean;
  position: BetPosition;
}

const OpenRoundCard: React.FC<OpenRoundCardProps> = ({
  round,
  betAmount,
  hasEnteredUp,
  hasEnteredDown,
  bullMultiplier,
  bearMultiplier,
}) => {
  const [state, setState] = useState<State>({
    isSettingPosition: false,
    position: BetPosition.BULL,
  });
  const { t } = useTranslation();
  const interval = useGetIntervalBlocks();
  const { toastSuccess } = useToast();
  const { account, isAuthenticated } = useMoralis();
  const isAuth = isAuthenticated && account;
  const dispatch = useAppDispatch();
  const { currentBlock } = useBlock();
  const { isSettingPosition, position } = state;
  const isBufferPhase = currentBlock >= (round.startBlock as number) + interval;
  const positionDisplay =
    position === BetPosition.BULL
      ? t('Up').toUpperCase()
      : t('Down').toUpperCase();
  const { targetRef, tooltipVisible, tooltip } = useTooltip(
    <div style={{ whiteSpace: 'nowrap' }}>{`${formatDehub(
      betAmount
    )} DEHUB`}</div>,
    { placement: 'top' }
  );

  /*
   * Bettable rounds do not have an lockBlock set so we approximate it by adding the block interval
   * to the start block
   */
  const estimatedLockBlock = (round.startBlock as number) + interval;

  const getCanEnterPosition = () => {
    if (hasEnteredUp || hasEnteredDown) {
      return false;
    }

    if (round.lockPrice > 0) {
      return false;
    }

    if (
      isAuth &&
      window.localStorage.getItem(`bet_${round.id}_${account}`) !== null
    ) {
      return false;
    }

    return true;
  };

  const canEnterPosition = getCanEnterPosition();

  const handleBack = () =>
    setState(prevState => ({
      ...prevState,
      isSettingPosition: false,
    }));

  const handleSetPosition = (newPosition: BetPosition) => {
    setState(prevState => ({
      ...prevState,
      isSettingPosition: true,
      position: newPosition,
    }));
  };

  const togglePosition = () => {
    setState(prevState => ({
      ...prevState,
      position:
        prevState.position === BetPosition.BULL
          ? BetPosition.BEAR
          : BetPosition.BULL,
    }));
  };

  const handleSuccess = async (decimalValue: BigNumber, hash: string) => {
    // Optimistically set the user bet so we see the entered position immediately.
    dispatch(
      markPositionAsEntered({
        account,
        roundId: round.id,
        bet: {
          hash,
          round,
          position,
          amount: getDehubAmount(decimalValue).toNumber(),
          claimed: false,
        },
      })
    );

    handleBack();

    toastSuccess(
      t('Success!'),
      t('%position% position entered', {
        position: positionDisplay,
      })
    );
  };

  const getPositionEnteredIcon = () => {
    return position === BetPosition.BULL ? (
      <ArrowUpIcon color="currentColor" />
    ) : (
      <ArrowDownIcon color="currentColor" />
    );
  };

  useEffect(() => {
    if (!canEnterPosition) {
      handleBack();
    }
  }, [canEnterPosition]);

  return (
    <CardFlip isFlipped={isSettingPosition} height="404px">
      <Card className="border-neon-1">
        <CardHeader
          status="next"
          epoch={round.epoch as number}
          blockNumber={estimatedLockBlock}
          icon={<PlayCircleOutlineIcon color="white" mr="4px" width="21px" />}
          title={t('Next')}
        />
        <CardBody p="16px">
          <MultiplierArrow
            betAmount={betAmount}
            multiplier={bullMultiplier}
            hasEntered={hasEnteredUp}
          />
          <RoundResultBox isNext={canEnterPosition} isLive={!canEnterPosition}>
            {canEnterPosition ? (
              <>
                <PrizePoolRow totalAmount={round.totalAmount} mb="8px" />
                <Button
                  variant="success"
                  width="100%"
                  onClick={() => handleSetPosition(BetPosition.BULL)}
                  mb="4px"
                  disabled={!canEnterPosition || isBufferPhase}
                >
                  {t('Enter UP')}
                </Button>
                <Button
                  variant="danger"
                  width="100%"
                  onClick={() => handleSetPosition(BetPosition.BEAR)}
                  disabled={!canEnterPosition || isBufferPhase}
                >
                  {t('Enter DOWN')}
                </Button>
              </>
            ) : (
              <>
                <div ref={targetRef}>
                  <Button
                    disabled
                    startIcon={getPositionEnteredIcon()}
                    width="100%"
                    mb="8px"
                  >
                    {t('%position% Entered', { position: positionDisplay })}
                  </Button>
                </div>
                <PrizePoolRow totalAmount={round.totalAmount} />
                {tooltipVisible && tooltip}
              </>
            )}
          </RoundResultBox>
          <MultiplierArrow
            betAmount={betAmount}
            multiplier={bearMultiplier}
            betPosition={BetPosition.BEAR}
            hasEntered={hasEnteredDown}
          />
        </CardBody>
      </Card>
      <SetPositionCard
        onBack={handleBack}
        onSuccess={handleSuccess}
        position={position}
        togglePosition={togglePosition}
        id={round.id}
      />
    </CardFlip>
  );
};

export default OpenRoundCard;
