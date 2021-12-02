import React from 'react';
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  Card,
  IconButton,
} from '@dehub/react/pcsuikit';
import styled from 'styled-components';
import { faHome } from '@fortawesome/pro-duotone-svg-icons';

import { useGetCurrentEpoch, useGetSortedRounds } from '../../../state/hooks';
import useSwiper from '../hooks/useSwiper';
import DuotoneFontAwesomeIcon from './DuotoneFontAwesomeIcon';
import useTheme from '../../../hooks/useTheme';

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
      <IconButton variant="primary" scale="sm" onClick={handleSlideToLive}>
        {/* <i className="fad fa-home"></i> */}
        {/* <DuotoneFontAwesomeIcon
          icon={faHome}
          primaryColor="#f11484"
          primaryOpacity="0.8"
          secondaryColor="rgb(255,216,0)"
          secondaryOpacity="0.8"
        /> */}
        <DuotoneFontAwesomeIcon
          icon={faHome}
          primaryColor={theme.colors.primary}
          primaryOpacity="0.8"
          secondaryColor={theme.colors.inputSecondary}
          secondaryOpacity="0.8"
        />
      </IconButton>
      <IconButton variant="text" scale="sm" onClick={handleNextSlide}>
        <ArrowForwardIcon color="secondary" width="24px" />
      </IconButton>
    </StyledPrevNextNav>
  );
};

export default PrevNextNav;
