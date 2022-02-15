import { WalletConnectingState } from '@dehub/shared/model';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '..';
import { AppState } from '../store';
import { setWalletConnectingState } from './';

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
