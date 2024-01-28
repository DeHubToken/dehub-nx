import {
  DeHubConnectorNames,
  MoralisConnectorNames,
} from '@dehub/shared/model';

export const isMoralisConnector = (connectorId: DeHubConnectorNames) =>
  Object.values<DeHubConnectorNames>(MoralisConnectorNames).includes(
    connectorId
  );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ethereumEnabled = () => (window as any).ethereum;
export const ethereumDisabled = () => !ethereumEnabled();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bscEnabled = () => (window as any).BinanceChain;
export const bscDisabled = () => !bscEnabled();
