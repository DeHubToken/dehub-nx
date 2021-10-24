import { useCallback } from 'react';
import { setWalletConnectingState } from './actions';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store';
import { WalletConnectingState } from '@dehub/shared/config';

export function useWalletConnectingState(): WalletConnectingState {
  return useSelector(
    (state: AppState) => state.application.walletConnectingState
  );
}

export function useSetWalletConnectingState(): (
  connectingState: WalletConnectingState
) => void {
  const dispatch = useDispatch();
  return useCallback(
    (connectingState: WalletConnectingState) => {
      dispatch(setWalletConnectingState({ connectingState }));
    },
    [dispatch]
  );
}
