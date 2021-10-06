import { useContext } from 'react';
import { MoralisEthersContext } from '../context/MoralisEthersContext';

export const useMoralisEthers = () => {
  const context = useContext(MoralisEthersContext);
  return context;
}