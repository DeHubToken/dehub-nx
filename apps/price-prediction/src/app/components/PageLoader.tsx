import React from 'react'
import styled from 'styled-components'
// import { Spinner } from '@pancakeswap/uikit'
import { CircularProgress } from '@material-ui/core'
import Page from './layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <CircularProgress size="5rem" />
    </Wrapper>
  )
}

export default PageLoader
