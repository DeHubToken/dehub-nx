import React from 'react';
import styled from 'styled-components';
import Flex from '../../components/Box/Flex';
import { Box } from '../../components/Box';
import { ArrowBackIcon, CloseIcon } from '../../components/Svg';
import { IconButton } from '../../components/Button';
import { ModalProps } from './types';

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: ${({ background }) => background || 'transparent'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  display: flex;
  padding: 6px 5px 6px 20px;
`;

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`;

export const ModalBody = styled(Flex)`
  flex-direction: column;
`;

export const ModalCloseButton: React.FC<{
  onDismiss: ModalProps['onDismiss'];
}> = ({ onDismiss }) => {
  return (
    <IconButton
      variant="text"
      onClick={onDismiss}
      aria-label="Close the dialog"
    >
      <CloseIcon color="dhbWhite" />
    </IconButton>
  );
};

export const ModalBackButton: React.FC<{ onBack: ModalProps['onBack'] }> = ({
  onBack,
}) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="primary" />
    </IconButton>
  );
};

export const ModalContainer = styled(Box)<{ minWidth: string }>`
  overflow: hidden;
  background: linear-gradient(
    128deg,
    rgba(11, 17, 19, 1) 0%,
    rgba(26, 50, 63, 0.8) 25%,
    rgba(50, 19, 56, 0.8) 100%
  );
  box-shadow: 0 11px 15px -7px rgb(0 0 0 / 20%),
    0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%);
  border-radius: 8px;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.modal};

  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    min-width: ${({ minWidth }) => minWidth};
    max-width: 100%;
  }
`;
