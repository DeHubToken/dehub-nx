import React from 'react';
import { Hooks } from '@dehub/react/core';
import { AutoRenewIcon, HistoryIcon, IconButton } from '@dehub/react/pcsuikit';
import { useAppDispatch } from '../../../state';
import { setHistoryPaneState } from '../../../state/predictions';
import { useGetIsFetchingHistory } from '../../../state/hooks';

const HistoryButton = () => {
  const isFetchingHistory = useGetIsFetchingHistory();
  const dispatch = useAppDispatch();
  const { account } = Hooks.useMoralisEthers();

  const handleClick = () => {
    dispatch(setHistoryPaneState(true));
  };

  return (
    <IconButton
      variant="primary"
      ml="8px"
      onClick={handleClick}
      isLoading={isFetchingHistory}
      disabled={!account}
    >
      {isFetchingHistory ? (
        <AutoRenewIcon spin color="white" />
      ) : (
        <HistoryIcon width="24px" color="white" />
      )}
    </IconButton>
  );
};

export default HistoryButton;
