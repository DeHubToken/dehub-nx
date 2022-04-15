import { DeHubConnectorNames, MoralisConnectorNames } from '../web3.model';

export const isMoralisConnector = (connector: DeHubConnectorNames) => {
  Object.values(MoralisConnectorNames).includes(connector.valueOf() as string);
};
