import { useContext, useMemo } from 'react';
import { useMoralis } from 'react-moralis';
import { MoralisEthersContext } from '../context/MoralisEthersContext';

export const useMoralisEthers = () => {
  const context = useContext(MoralisEthersContext);

  if (!context) {
    throw new Error(
      "Make sure to only call useMoralisEthers within a  <MoralisEthersProvider>",
    );
  }
  return context;
}
