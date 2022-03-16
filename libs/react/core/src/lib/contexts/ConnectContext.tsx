import { WalletConnectingState } from '@dehub/shared/model';
import { createContext, ReactNode, useState } from 'react';

interface NetworkProps {
  defaultChainId: number;
}

interface WalletConnectingProps {
  walletConnectingState: WalletConnectingState;
  setWalletConnectingState: (connectingState: WalletConnectingState) => void;
}

type ConnectContextValue = NetworkProps & WalletConnectingProps;

const ConnectContext = createContext<undefined | ConnectContextValue>(
  undefined
);

interface ConnectProviderProps extends NetworkProps {
  children?: ReactNode;
}

const ConnectProvider = ({
  children,
  defaultChainId: _defaultChainId = 1,
}: ConnectProviderProps) => {
  const [walletConnectingState, setWalletConnectingState] =
    useState<WalletConnectingState>(WalletConnectingState.INIT);
  const [defaultChainId] = useState(_defaultChainId);

  return (
    <ConnectContext.Provider
      value={{
        walletConnectingState,
        setWalletConnectingState,
        defaultChainId,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

export { ConnectContext, ConnectProvider };
