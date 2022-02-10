import { useContext } from 'react';
import { ConnectContext } from '../contexts/ConnectContext';

export const useConnectContext = () => {
  const context = useContext(ConnectContext);
  if (!context) {
    throw new Error(
      'Make sure to only call useConnectContext within <ConnectProvider>'
    );
  }

  return context;
};
