import { WalletConnectingState } from '@dehub/shared/models';
import { createContext, ReactNode, useState } from 'react';

interface PageMetaProps {
  baseUrl: string;
  pageTitle: string;
  landingUrl: string;
}

interface NetworkProps {
  defaultChainId: number;
}

interface WalletConnectingProps {
  walletConnectingState: WalletConnectingState;
  setWalletConnectingState: (connectingState: WalletConnectingState) => void;
}

type ConnectContextValue = PageMetaProps & NetworkProps & WalletConnectingProps;

const ConnectContext = createContext<undefined | ConnectContextValue>(
  undefined
);

interface ConnectProviderProps extends PageMetaProps, NetworkProps {
  children?: ReactNode;
}

const ConnectProvider = ({
  children,
  baseUrl: _baseUrl = '/',
  pageTitle: _pageTitle = 'DeHub dApp',
  landingUrl: _landingUrl = 'https://dehub.net',
  defaultChainId: _defaultChainId = 1,
}: ConnectProviderProps) => {
  const [walletConnectingState, setWalletConnectingState] =
    useState<WalletConnectingState>(WalletConnectingState.INIT);
  const [defaultChainId] = useState(_defaultChainId);
  const [baseUrl] = useState(_baseUrl ?? null);
  const [pageTitle] = useState(_pageTitle ?? null);
  const [landingUrl] = useState(_landingUrl ?? null);

  return (
    <ConnectContext.Provider
      value={{
        walletConnectingState,
        setWalletConnectingState,
        defaultChainId,
        baseUrl,
        pageTitle,
        landingUrl,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

export { ConnectContext, ConnectProvider };
