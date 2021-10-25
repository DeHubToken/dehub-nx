import { Hooks } from '@dehub/react/core';
import React, { useEffect } from 'react';
import { getChainId, getChainIdHex } from '../../config/constants';
import { addNetwork, switchNetwork } from '../../utils/providers';

interface MoralisReactManagerProps {
  children?: React.ReactNode;
}

const MoralisReactManager = ({ children }: MoralisReactManagerProps) => {
  const { chainId, authProvider } = Hooks.useMoralisEthers();

  useEffect(() => {
    const setupNetwork = async () => {
      // If wrong chain id, ask to switch network
      console.log('Current Chain Id', chainId);
      if (chainId !== getChainIdHex()) {
        console.log('Ask to switch network');

        try {
          await switchNetwork(getChainId());
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((switchError as any).code === 4902) {
            await addNetwork(getChainId());
          }
        }
      }
    };

    if (chainId && authProvider) {
      setupNetwork();
    }
  }, [chainId, authProvider]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};

export default MoralisReactManager;
