import React, { useState, useEffect } from 'react';

import { Hooks } from '@dehub/react/core';

import { getChainIdHex, getNetworkInfo } from '../../config/constants';

interface MoralisReactManagerProps {
  children?: React.ReactNode;
}

const MoralisReactManager = ({ children }: MoralisReactManagerProps) => {
  const { chainId, authProvider } = Hooks.useMoralisEthers();

  useEffect(() => {
    const switchNetwork = async () => {
      try {
        // If wrong chain id, ask to switch network
        console.log('Current Chain Id', chainId);
        if (chainId !== getChainIdHex()) {
          console.log('Ask to switch network');

          if (authProvider?.provider && authProvider?.provider?.request) {
            await authProvider?.provider?.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: getChainIdHex() }],
            });
          }
        }
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((switchError as any).code === 4902) {
          console.log('Add network');
          try {
            if (authProvider?.provider && authProvider?.provider?.request) {
              const networkInfo = getNetworkInfo();
              await authProvider?.provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: networkInfo.CHAIN_ID_HEX,
                    rpcUrl: networkInfo.RPC_URL,
                  },
                ],
              });
            }
          } catch (addError) {
            // TODO: handle "add" error by showing error alert
            console.error('addEthereumChain', addError);
          }
        }
      }
    };

    if (chainId && authProvider) {
      switchNetwork();
    }
  }, [chainId, authProvider]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};

export default MoralisReactManager;
