import {
  ArrowBackIcon,
  ArrowForwardIcon,
  Card,
  IconButton,
} from '@dehub/react/pcsuikit';
import React from 'react';
import styled from 'styled-components';
import useTheme from '../../../hooks/useTheme';
import { useGetCurrentEpoch, useGetSortedRounds } from '../../../state/hooks';
import useSwiper from '../hooks/useSwiper';

const StyledPrevNextNav = styled(Card)`
  align-items: center;
  display: none;
  justify-content: space-between;
  overflow: initial;
  position: relative;
  width: 128px;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
  }
`;

const PrevNextNav = () => {
  const { swiper } = useSwiper();
  const currentEpoch = useGetCurrentEpoch();
  const rounds = useGetSortedRounds();
  const { theme } = useTheme();

  const handlePrevSlide = () => {
    swiper?.slidePrev();
  };

  const handleNextSlide = () => {
    swiper?.slideNext();
  };

  const handleSlideToLive = () => {
    const currentEpochIndex = rounds.findIndex(
      round => round.epoch === currentEpoch
    );

    swiper?.slideTo(currentEpochIndex - 1);
    swiper?.update();
  };

  return (
    <StyledPrevNextNav>
      <IconButton variant="text" scale="sm" onClick={handlePrevSlide}>
        <ArrowBackIcon color="secondary" width="24px" />
      </IconButton>
      <IconButton variant="tertiary" scale="sm" onClick={handleSlideToLive}>
        <i className="fas fa-home"></i>
      </IconButton>
      <IconButton variant="text" scale="sm" onClick={handleNextSlide}>
        <ArrowForwardIcon color="secondary" width="24px" />
      </IconButton>
    </StyledPrevNextNav>
  );
};

export default PrevNextNav;
