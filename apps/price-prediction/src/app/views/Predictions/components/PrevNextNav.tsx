import React from 'react'
import { ArrowBackIcon, ArrowForwardIcon, BunnyCardsIcon, Card, IconButton } from '@pancakeswap/uikit'
import HomeIcon from '@material-ui/icons/Home';
import styled from 'styled-components'
import { useGetCurrentEpoch, useGetSortedRounds } from 'state/hooks'
import useSwiper from '../hooks/useSwiper'

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
`

const Icon = styled.div`
  cursor: pointer;
  left: 50%;
  margin-left: -12px;
  position: absolute;
`

const PrevNextNav = () => {
  const { swiper } = useSwiper()
  const currentEpoch = useGetCurrentEpoch()
  const rounds = useGetSortedRounds()

  const handlePrevSlide = () => {
    swiper.slidePrev()
  }

  const handleNextSlide = () => {
    swiper.slideNext()
  }

  const handleSlideToLive = () => {
    const currentEpochIndex = rounds.findIndex((round) => round.epoch === currentEpoch)

    swiper.slideTo(currentEpochIndex - 1)
    swiper.update()
  }

  return (
    <StyledPrevNextNav>
      <IconButton variant="text" scale="sm" onClick={handlePrevSlide}>
        <ArrowBackIcon color="primary" width="24px" />
      </IconButton>
      <Icon onClick={handleSlideToLive}>
        <HomeIcon />
      </Icon>
      <IconButton variant="text" scale="sm" onClick={handleNextSlide}>
        <ArrowForwardIcon color="primary" width="24px" />
      </IconButton>
    </StyledPrevNextNav>
  )
}

export default PrevNextNav
