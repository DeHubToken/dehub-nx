import { useContext } from 'react';
import { MoralisEthersContext } from '../contexts/MoralisEthersContext';

export const useMoralisEthers = () => {
  const context = useContext(MoralisEthersContext);

  if (!context) {
    throw new Error(
      "Make sure to only call useMoralisEthers within a  <MoralisEthersProvider>",
    );
  }
  return context;
}
