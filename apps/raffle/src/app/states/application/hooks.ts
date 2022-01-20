import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { WalletConnectingState } from '@dehub/shared/moralis';

import { setWalletConnectingState } from './';
import { useAppDispatch } from '..';
import { AppState } from '../store';

export const useWalletConnectingState = (): WalletConnectingState => {
  return useSelector(
    (state: AppState) => state.application.walletConnectingState
  );
};

export const useSetWalletConnectingState = (): ((
  connectingState: WalletConnectingState
) => void) => {
  const dispatch = useAppDispatch();
  return useCallback(
    (connectingState: WalletConnectingState) => {
      dispatch(setWalletConnectingState({ connectingState }));
    },
    [dispatch]
  );
};
