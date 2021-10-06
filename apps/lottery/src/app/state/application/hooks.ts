import { useCallback } from 'react';
import {
  toggleWalletModal,
  setWalletConnectingState
} from './actions';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../index';
import { WalletConnectingState } from '../../constants';

export function useWalletModalOpen(): boolean {
  return useSelector((state: AppState) => state.application.walletModalOpen);
}

export function useWalletModalToggle(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(toggleWalletModal()), [dispatch]);
}

export function useWalletConnectingState(): WalletConnectingState {
  return useSelector((state: AppState) => state.application.walletConnectingState);
}

export function useSetWalletConnectingState(): (connectingState: WalletConnectingState) => void {
  const dispatch = useDispatch();
  return useCallback(
    (connectingState: WalletConnectingState) => {
      dispatch(setWalletConnectingState({ connectingState }))
    }, [dispatch]
  );
}