import { useContext } from 'react';
import { EnvironmentContext } from '../contexts/EnvironmentContext';

export const useEnvironmentContext = () => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error(
      'Make sure to only call useEnvironmentContext within <EnvironmentProvider>'
    );
  }

  return context;
};
