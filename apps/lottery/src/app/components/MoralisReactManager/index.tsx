import React, { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';

import { Hooks } from '@dehub/react/core';

interface MoralisReactManagerProps {
  children?: React.ReactNode;
}

const MoralisReactManager = ({ children }: MoralisReactManagerProps) => {
  const { enableWeb3, authenticate, user } = useMoralis();

  const { activateProvider } = Hooks.useMoralisEthers();

  useEffect(() => {
    const loginMoralis = async (provider: string | null) => {
      window.localStorage.setItem('providerName', provider ?? '');

      if (provider) {
        await authenticate({ provider: 'walletconnect' });
      } else {
        await authenticate();
      }
    };

    const enableMoralis = async () => {
      const savedProviderName = window.localStorage.getItem('providerName');

      if (savedProviderName && savedProviderName === 'walletconnect') {
        await enableWeb3({ provider: 'walletconnect' });
      } else {
        await enableWeb3();
      }

      if (window.localStorage.getItem('chainChange')) {
        await loginMoralis(savedProviderName);
        window.localStorage.removeItem('chainChange');
      }

      activateProvider();
    };

    if (user) {
      enableMoralis();
    }
  }, [user, authenticate, enableWeb3, activateProvider]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};

export default MoralisReactManager;
